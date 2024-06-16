import { Controller, Get } from '@nestjs/common';
import { GameService } from './game.service';
import { GameServiceGrpcControllerMethods, GameServiceGrpcController, EnterGameReq, EnterGameRes } from '@app/grpc';

@Controller()
@GameServiceGrpcControllerMethods()
export class GameController implements GameServiceGrpcController {
  constructor(private readonly gameService: GameService) { }
  enterGame(request: EnterGameReq, ...rest: any): Promise<EnterGameRes> { 
    return Promise.resolve({
      data: {
        email: 'gameServer进入游戏',
      }
    })
  }

  @Get()
  getHello(): string {
    return this.gameService.getHello();
  }
}
