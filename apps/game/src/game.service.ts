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
    let newPlayer = false;
    if (!player) {
      await this.playerService.createPlayer(id);
      newPlayer = true;
    }
    const playerData = await this.playerService.getPlayerByUserId(id);
    playerData.newPlayer = newPlayer;
    return playerData;
  }
} 
