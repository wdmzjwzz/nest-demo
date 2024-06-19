import { Injectable, Logger } from '@nestjs/common';
import { Player } from '../entity/player.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PlayerManager } from './player.manager';
import { EnterGameReq } from '@app/grpc';

@Injectable()
export class PlayerService {
  players: Set<PlayerManager> = new Set();
  playersMap: Map<string, PlayerManager> = new Map();

  constructor(
    @InjectRepository(Player)
    private readonly playerRepository: Repository<Player>,
  ) { }

  async createPlayer(id: string) {
    try {
      const player = this.genPlayer(id);
      await this.insertPlayer(player); 
    } catch (error) {
      Logger.error(error)
    }
  }
  getPlayer(userId: string) {
    const { player } = this.playersMap.get(userId) || {};
    return player
  }
  /**
   *  随机生成一个新玩家
   * @returns 
   */
  private genPlayer(id: string) {
    const player = new Player();
    player.userId = id;
    player.name = `道友_${id}`;
    player.updateTime = new Date().getTime().toString();

    return player
  }
  getPlayerByUserId(id: string) {
    return this.playerRepository.findOneBy({ userId: String(id) });
  }
  private insertPlayer(data: Player) {
    return this.playerRepository.insert(data);
  }
}
