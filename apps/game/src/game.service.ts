import { EnterGameReq } from '@app/grpc';
import { Injectable } from '@nestjs/common';
import { PlayerService } from './player/player.service';
import { ReligionService } from './religion/religion.service';

@Injectable()
export class GameService {
  constructor(private playerService: PlayerService, private religionService: ReligionService) { }
  async enterGame(request: EnterGameReq) {
    return this.playerService.createPlayer(request);
  }
} 
