import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReligionManager } from './religion.manager';
import { Religion } from '../entity/religion.entity';

@Injectable()
export class ReligionService {
  religions: Set<ReligionManager> = new Set();
  religionsMap: Map<number, ReligionManager> = new Map();

  constructor(
    @InjectRepository(Religion)
    private readonly religionRepository: Repository<Religion>,
  ) {
    this.init()
  }

  async init() { 
    try {
      let rels = await this.getAllReligion() ?? [];
      if (!rels?.length) {
        for (let index = 0; index < 10; index++) {
          const re = this.genReligion(index)
          rels.push(re)
        }
        await this.addReligions(rels);
      }
      for (const rel of rels) {
        const manager = new ReligionManager(rel)
        this.religions.add(manager);
        this.religionsMap.set(rel.id, manager)
      }
    } catch (error) {
      Logger.error(error)
    }
  }
  getReligion(id: number) {
    const { religion } = this.religionsMap.get(id) || {};
    return religion
  }

  /**
   *  随机生成一个新宗门
   * @returns 
   */
  private genReligion(id: number) {
    const religion = new Religion();
    religion.name = `宗门_${id}`;
    religion.masterId = id;
    religion.position = '0,0,0';
    religion.sceneId = 0;

    return religion
  }
  private addReligions(datas: Religion[]) {
    return this.religionRepository.insert(datas)
  }
  private getReligionById(id: string) {
    return this.religionRepository.findOneBy({ id: Number(id) });
  }
  private getAllReligion() {
    return this.religionRepository.find();
  }
}
