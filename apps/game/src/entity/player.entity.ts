import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Player {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: string;

  @Column({
    default: 0
  })
  sceneId: number;

  @Column()
  name: string;

  @Column()
  updateTime: string;

  @Column({
    default: '0,0,0'
  })
  position: string;

  @Column({
    default: 0
  })
  level: number;

  @Column({
    default: 100
  })
  blood: number;

  @Column({
    default:100
  })
  fullBlood: number;

  @Column({
    default: 0
  })
  mana: number; // 法力

  @Column({
    default: 0
  })
  manaQuality: number;

  @Column({
    default: 100
  })
  fullMana: number;

  @Column()
  religionId: number; // 宗门

  @Column({
    default: 0
  })
  growth: number;

  @Column({
    default: 0
  })
  gender: number;

  @Column({
    default: 1
  })
  age: number;

  @Column({
    default: 100
  })
  life: number;
}
