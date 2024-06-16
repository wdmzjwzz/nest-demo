import { ServerPort } from '@app/common';
import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse } from '@nestjs/websockets';
import { Observable, interval, map } from 'rxjs';
import { Server } from 'socket.io';
import { GatewayService } from '../gateway.service';
import { error } from 'console';

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
      payload.subscribe(data => { 
        this.gatewayService.enterGame(data.data.email);
      })

      return payload.pipe(map(item => ({ event: 'EnterGame', data: item.data })));
    } catch (error) {
      return {
        event: 'EnterGame',
        data: {
          error: 'token 失效'
        }
      };
    }
  }
}
