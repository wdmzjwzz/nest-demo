import { NestFactory } from '@nestjs/core';
import { GatewayModule } from './gateway.module';
import { ServerPort } from '@define/common';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(GatewayModule);
  app.enableCors();
  await app.listen(ServerPort.GateWay);
  Logger.log(`ServerPort.GateWay start ${ServerPort.GateWay}`);
}
bootstrap();
