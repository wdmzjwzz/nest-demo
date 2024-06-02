import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { ServerPort } from '@app/common';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  await app.listen(ServerPort.Auth);
  console.log(`ServerPort.Auth start ${ServerPort.Auth}`); 
}
bootstrap();
