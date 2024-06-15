import { ServerPort } from '@app/common';
import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse } from '@nestjs/websockets';
import { Observable, interval, map } from 'rxjs';
import { Server } from 'socket.io';
import { GatewayService } from '../gateway.service';

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

  @SubscribeMessage('identity')
  async identity(@MessageBody() data: number) {
    const checkToken = await this.gatewayService.checkToken(); 
    return checkToken;
  }
}
