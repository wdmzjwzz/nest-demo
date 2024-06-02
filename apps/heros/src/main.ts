import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { HeroModule } from './hero.module';
import { ServerPort } from '@app/common';
import { grpcClientOptions } from '@app/grpc';

async function bootstrap() {
  const app = await NestFactory.create(HeroModule);
  app.connectMicroservice<MicroserviceOptions>(grpcClientOptions);

  await app.startAllMicroservices();
  await app.listen(ServerPort.Hero);
}
bootstrap();
