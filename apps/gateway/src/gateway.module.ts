import { Module } from '@nestjs/common';
import { GatewayController } from './gateway.controller';
import { GatewayService } from './gateway.service';
import { ClientsModule } from '@nestjs/microservices';
import { AUTH_SERVICE_GRPC_SERVICE_NAME, authClientOptions } from '@app/grpc';

@Module({
  imports: [ 
    ClientsModule.register([
      {
        name: AUTH_SERVICE_GRPC_SERVICE_NAME,
        ...authClientOptions,
      },
    ]), 
  ],
  controllers: [GatewayController],
  providers: [GatewayService],
})
export class GatewayModule { }
