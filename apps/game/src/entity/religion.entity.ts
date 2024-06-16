import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Religion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  masterId: number;

  @Column()
  position: string;

  @Column()
  sceneId: number;
}
