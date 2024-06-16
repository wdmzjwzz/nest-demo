import { Module } from '@nestjs/common';
import { GameController } from './game.controller';
import { GameService } from './game.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Player } from './entity/player.entity';
import { PlayerService } from './player/player.service';
import { Religion } from './entity/religion.entity';
import { ReligionService } from './religion/religion.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: 'wzz123@1',
      database: 'define_wang',
      autoLoadEntities: true,
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Player, Religion])
  ],
  controllers: [GameController],
  providers: [GameService, PlayerService, ReligionService],
})
export class GameModule { }
