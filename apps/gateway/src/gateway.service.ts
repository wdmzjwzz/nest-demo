
import { AUTH_SERVICE_GRPC_SERVICE_NAME, AuthServiceGrpcClient } from '@app/grpc';
import { Metadata } from '@grpc/grpc-js';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class GatewayService {
  async getHello() {
    const $data = this.authServiceClient.checkToken({
      token: '22222'
    })
    const { data } = await firstValueFrom($data);
    return 'Hello World GatewayService!' + data.account;
  }
  private authServiceClient: AuthServiceGrpcClient;
  constructor(@Inject(AUTH_SERVICE_GRPC_SERVICE_NAME) private client: ClientGrpc) { }

  onModuleInit() {
    this.authServiceClient = this.client.getService<AuthServiceGrpcClient>(AUTH_SERVICE_GRPC_SERVICE_NAME);
  }
}
