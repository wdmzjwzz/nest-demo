import { RpcFunc, ServerPort } from '@app/common';
import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { GatewayService } from '../gateway.service';

interface ClientSyncInput {
  id: string;
  vector: [x: number, y: number, z: number];
  dt: number;
}

@WebSocketGateway(ServerPort.WebSocketPort, {
  cors: {
    origin: '*',
  }
})
export class ClientSocketGateway {
  constructor(private gatewayService: GatewayService) { }

  clientMap = new Map<string, Socket>();

  inputs: ClientSyncInput[] = [];

  @WebSocketServer()
  server: Server;

  @SubscribeMessage(RpcFunc.EnterGame)
  async enterGame(@MessageBody() data: any, @ConnectedSocket() client: Socket,) {
    const { token } = data; 
    try {
      const { data } = await this.gatewayService.checkToken(token);
      this.clientMap.set(data.id, client);
      this.startInterval(data.id)
      const player = await this.gatewayService.enterGame(data.email, data.id);
      return { event: RpcFunc.EnterGame, data: player };
    } catch (error) {
      return {
        event: RpcFunc.EnterGame,
        data: {
          error: error
        }
      };
    }
  }

  @SubscribeMessage(RpcFunc.SyncClient)
  async syncClient(@MessageBody() data: any) {
    this.inputs.push(data);
  }

  @SubscribeMessage(RpcFunc.GetPlayers)
  async getPlayers(@MessageBody() data: any) {
    try {
      const players = await this.gatewayService.getPlayers()
      return { event: RpcFunc.GetPlayers, data: JSON.parse(players.data) };
    } catch (error) {
      return {
        event: RpcFunc.GetPlayers,
        data: {
          error: error
        }
      };
    }
  }

  private startInterval(id: string) {
    const client = this.clientMap.get(id);
    if (!client) {
      throw new Error("client undefined");
    }
    setInterval(() => {
      client.emit(RpcFunc.SyncClient, {
        data: [...this.inputs],
      })
      this.inputs.length = 0;
    }, 100)
  }


}
