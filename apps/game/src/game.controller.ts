import { Controller } from '@nestjs/common';
import { GameService } from './game.service';
import { GameServiceGrpcControllerMethods, GameServiceGrpcController, EnterGameReq, EnterGameRes, GetPlayerReq } from '@app/grpc';
import { Observable } from 'rxjs';

@Controller('game')
@GameServiceGrpcControllerMethods()
export class GameController implements GameServiceGrpcController {
  constructor(private readonly gameService: GameService) { }

  async getPlayer({ id }: GetPlayerReq, ...rest: any): Promise<EnterGameRes> {
    const player = await this.gameService.getPlayer(id);
    return {
      player: JSON.stringify(player)
    }
  }
  async enterGame(request: EnterGameReq, ...rest: any): Promise<EnterGameRes> {
    const player = await this.gameService.enterGame(request);
    return {
      player: JSON.stringify(player)
    }
  }

}
