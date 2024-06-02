import { Hero, HeroById } from '@app/grpc';
import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';

interface HeroesService {
  findOne(data: HeroById): Observable<Hero>;
  findMany(upstream: Observable<HeroById>): Observable<Hero>;
}

@Injectable()
export class GatewayService {
  getHello(): string {
    return 'Hello World GatewayService!';
  }
  private heroesService: HeroesService;

  constructor(@Inject('HERO_PACKAGE') private client: ClientGrpc) { }

  onModuleInit() {
    this.heroesService = this.client.getService<HeroesService>('HeroesService');
  }

  getHero(): Observable<Hero> {
    return this.heroesService.findOne({ id: 1 });
  }
}
