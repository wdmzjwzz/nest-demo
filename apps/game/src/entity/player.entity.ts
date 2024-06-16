import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Player {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: string;

  @Column()
  sceneId: number;

  @Column()
  name: string;

  @Column()
  updateTime: string;

  @Column()
  position: string;

  @Column()
  level: number;

  @Column()
  blood: number;

  @Column()
  fullBlood: number;

  @Column()
  mana: number; // 法力

  @Column()
  fullMana: number;

  @Column()
  religion: number; // 宗门

  @Column()
  powerAttr: number; // 灵根 
}
