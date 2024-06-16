import { ReflectionService } from '@grpc/reflection';
import { ClientOptions, Transport } from '@nestjs/microservices';
const ProtoPath = 'libs/grpc/src/protos/'
export const authClientOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    package: ['auth'],
    protoPath: [`${ProtoPath}auth.proto`],
    onLoadPackageDefinition: (pkg, server) => {
      new ReflectionService(pkg).addToServer(server);
    },
  },
};
export const gameClientOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    package: ['game'],
    protoPath: [`${ProtoPath}game.proto`],
    url:'127.0.0.1:5001',
    onLoadPackageDefinition: (pkg, server) => {
      new ReflectionService(pkg).addToServer(server);
    },
  },
};
