import { NestFactory } from '@nestjs/core';
import { GameModule } from './game.module';
import { ServerPort } from '@app/common';
import { MicroserviceOptions } from '@nestjs/microservices';
import { gameClientOptions } from '@app/grpc';

async function bootstrap() {
  const app = await NestFactory.create(GameModule);
  app.connectMicroservice<MicroserviceOptions>(gameClientOptions); 
  await app.startAllMicroservices();

  await app.listen(ServerPort.Game);
  console.log(`ServerPort.Game start ${ServerPort.Game}`);
}
bootstrap();
