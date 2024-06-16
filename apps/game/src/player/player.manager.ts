import { Player } from '../entity/player.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PlayerManager { 
  player: Player;
  constructor(player: Player) {
    this.player = player
  }
}
