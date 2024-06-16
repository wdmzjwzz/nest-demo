import { ServerPort } from '@app/common';
import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse } from '@nestjs/websockets';
import { Observable, interval, map } from 'rxjs';
import { Server } from 'socket.io';
import { GatewayService } from '../gateway.service';
import { error } from 'console';
import { Logger } from '@nestjs/common';

@WebSocketGateway(ServerPort.WebSocketPort, {
  cors: {
    origin: '*',
  }
})
export class ClientSocketGateway {
  constructor(private gatewayService: GatewayService) { }
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('events')
  findAll(@MessageBody() data: any): Observable<WsResponse<number>> {
    return interval(1000).pipe(map(item => ({ event: 'events', data: item })));
  }

  @SubscribeMessage('EnterGame')
  async enterGame(@MessageBody() data: any) {
    const { token } = data
    try {
      const payload = await this.gatewayService.checkToken(token);
      const player = await this.gatewayService.enterGame(payload.data.email, payload.data.id);
      return { event: 'EnterGame', data: JSON.parse(player) };
    } catch (error) {
      return {
        event: 'EnterGame',
        data: {
          error: error
        }
      };
    }
  }
}
