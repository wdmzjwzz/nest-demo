import { Religion } from '../entity/religion.entity'; 

export class ReligionManager { 
  religion: Religion;
  constructor(Religion: Religion) {
    this.religion = Religion
  }
}
