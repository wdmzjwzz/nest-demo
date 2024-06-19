import { EnterGameReq } from '@app/grpc';
import { Injectable } from '@nestjs/common';
import { PlayerService } from './player/player.service';
import { ReligionService } from './religion/religion.service';

@Injectable()
export class GameService {
  constructor(private playerService: PlayerService, private religionService: ReligionService) { }
  async enterGame(request: EnterGameReq) {
    return this.playerService.createPlayer(request.id);
  }
  async getPlayer(id: string) {
    let player = await this.playerService.getPlayerByUserId(id);
    if (!player) {
      await this.playerService.createPlayer(id)
    }
    return this.playerService.getPlayerByUserId(id);
  }
} 
