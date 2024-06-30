import { EnterGameReq } from '@app/grpc';
import { Injectable } from '@nestjs/common';
import { PlayerService } from './player/player.service';
import { ReligionService } from './religion/religion.service';
import { PlayerManager } from './player/player.manager';

@Injectable()
export class GameService {
  playerManagerMap: Map<string, PlayerManager> = new Map();

  constructor(private playerService: PlayerService, private religionService: ReligionService) { }

  async enterGame(request: EnterGameReq) {
    if (this.playerManagerMap.get(request.id)) {
      return this.playerManagerMap.get(request.id).player;
    }
    let player = await this.playerService.getPlayerByUserId(request.id);
    let newPlayer = false;
    if (!player) {
      await this.playerService.createPlayer(request.id);
      newPlayer = true;
    }
    const playerData = await this.playerService.getPlayerByUserId(request.id);
    const playerManager = new PlayerManager(playerData)
    this.playerManagerMap.set(request.id, playerManager)
    playerData.newPlayer = newPlayer;

    return playerData;
  }
} 
