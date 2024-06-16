import { Controller, Get } from '@nestjs/common';
import { GameService } from './game.service';
import { GameServiceGrpcControllerMethods, GameServiceGrpcController, EnterGameReq, EnterGameRes } from '@app/grpc';

@Controller()
@GameServiceGrpcControllerMethods()
export class GameController implements GameServiceGrpcController {
  constructor(private readonly gameService: GameService) { }
  async enterGame(request: EnterGameReq, ...rest: any): Promise<EnterGameRes> {
    const player = await this.gameService.enterGame(request); 
    return {
      player: JSON.stringify(player)
    }
  }
}
