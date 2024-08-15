import { NestFactory } from '@nestjs/core'; 
import { ServerPort } from '@define/common';
import { authClientOptions } from '@app/grpc';
import { MicroserviceOptions } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.connectMicroservice<MicroserviceOptions>(authClientOptions); 
  await app.startAllMicroservices();

  await app.listen(ServerPort.Auth);
  Logger.log(`ServerPort.Auth start ${ServerPort.Auth}`) 
}
bootstrap();
