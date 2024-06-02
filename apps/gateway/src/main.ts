import { NestFactory } from '@nestjs/core';
import { GatewayModule } from './gateway.module';
import { ServerPort } from '@app/common';

async function bootstrap() {
  const app = await NestFactory.create(GatewayModule);
  await app.listen(ServerPort.GateWay);
  console.log(`ServerPort.GateWay start ${ServerPort.GateWay}`);
}
bootstrap();
