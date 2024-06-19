
import { AUTH_SERVICE_GRPC_SERVICE_NAME, AuthServiceGrpcClient, GAME_SERVICE_GRPC_SERVICE_NAME, GameServiceGrpcClient } from '@app/grpc';
import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom, map } from 'rxjs';

@Injectable()
export class GatewayService {

  private authServiceClient: AuthServiceGrpcClient;
  private gameServiceClient: GameServiceGrpcClient;
  constructor(
    @Inject(AUTH_SERVICE_GRPC_SERVICE_NAME) private authClient: ClientGrpc,
    @Inject(GAME_SERVICE_GRPC_SERVICE_NAME) private gameClient: ClientGrpc
  ) { }

  onModuleInit() {
    this.authServiceClient = this.authClient.getService<AuthServiceGrpcClient>(AUTH_SERVICE_GRPC_SERVICE_NAME);
    this.gameServiceClient = this.gameClient.getService<GameServiceGrpcClient>(GAME_SERVICE_GRPC_SERVICE_NAME);
  }

  async checkToken(token: string) {
    const $data = this.authServiceClient.checkToken({ token })
    return firstValueFrom($data);
  }

  async enterGame(email: string, id: string) {
    const $data = this.gameServiceClient.enterGame({
      email: email,
      id
    }).pipe(map(({ player }) => player))

    return firstValueFrom($data);
  }
  async getPlayer(id: string) {
    const $data = this.gameServiceClient.getPlayer({
      id
    }).pipe(map(({ player }) => player))

    return firstValueFrom($data);
  }
}
