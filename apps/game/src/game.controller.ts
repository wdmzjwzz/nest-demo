import { Controller } from '@nestjs/common';
import { GameService } from './game.service';
import { GameServiceGrpcControllerMethods, GameServiceGrpcController, EnterGameReq, EnterGameRes, GetPlayerReq, ListActorRes } from '@app/grpc';
import { PlayerService } from './player/player.service';

@Controller('game')
@GameServiceGrpcControllerMethods()
export class GameController implements GameServiceGrpcController {
  constructor(private readonly gameService: GameService, private playerService: PlayerService) { }

  async getPlayers(): Promise<ListActorRes> {
    const players = await this.playerService.getAllPlayers();
    return {
      data: JSON.stringify(players)
    }
  }

  async getPlayer({ id }: GetPlayerReq): Promise<EnterGameRes> {
    const player = await this.playerService.getPlayerByUserId(id);
    return {
      player: JSON.stringify(player)
    }
  }

  async enterGame(request: EnterGameReq): Promise<EnterGameRes> { 
    const player = await this.gameService.enterGame(request); 
    return {
      player: JSON.stringify(player)
    }
  }
}
