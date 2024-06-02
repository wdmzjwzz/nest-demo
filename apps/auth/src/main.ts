import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { ServerPort } from '@app/common';
import { authClientOptions } from '@app/grpc';
import { MicroserviceOptions } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);

  app.connectMicroservice<MicroserviceOptions>(authClientOptions); 
  await app.startAllMicroservices();

  await app.listen(ServerPort.Auth);
  Logger.log(`ServerPort.Auth start ${ServerPort.Auth}`) 
}
bootstrap();
