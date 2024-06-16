import { ReflectionService } from '@grpc/reflection';
import { ClientOptions, Transport } from '@nestjs/microservices';
const ProtoPath = 'libs/grpc/src/protos/'
export const authClientOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    package: ['auth','game'],
    protoPath: [`${ProtoPath}auth.proto`,`${ProtoPath}game.proto`],
    onLoadPackageDefinition: (pkg, server) => {
      new ReflectionService(pkg).addToServer(server);
    },
  },
};
