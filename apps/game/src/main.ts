import { NestFactory } from '@nestjs/core';
import { GameModule } from './game.module';
import { ServerPort } from '@app/common';

async function bootstrap() {
  const app = await NestFactory.create(GameModule);
  await app.listen(ServerPort.Game);
  console.log(`ServerPort.Game start ${ServerPort.Game}`);
}
bootstrap();
