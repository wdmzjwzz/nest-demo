import { ReflectionService } from '@grpc/reflection';
import { ClientOptions, Transport } from '@nestjs/microservices';
const ProtoPath = 'libs/grpc/src/protos/'
export const authClientOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    package: ['auth'], // ['hero', 'hero2']
    protoPath: [`${ProtoPath}auth.proto`], // ['./hero/hero.proto', './hero/hero2.proto'] 
    onLoadPackageDefinition: (pkg, server) => {
      new ReflectionService(pkg).addToServer(server);
    },
  },
};
