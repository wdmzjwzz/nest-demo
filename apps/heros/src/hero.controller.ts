
import { Hero, HeroById } from '@app/grpc';
import { Controller, OnModuleInit } from '@nestjs/common';
import {
  GrpcMethod,
  GrpcStreamMethod,
} from '@nestjs/microservices';
import { Observable, Subject } from 'rxjs';

@Controller('hero')
export class HeroController implements OnModuleInit {
  private readonly items: Hero[] = [
    { id: 1, name: 'John' },
    { id: 2, name: 'Doe' },
  ];
  onModuleInit() {
    console.log('====================')
  }

  @GrpcMethod('HeroesService')
  findOne(data: HeroById): Hero {
    return this.items.find(({ id }) => id === data.id);
  }

  @GrpcStreamMethod('HeroesService')
  findMany(data$: Observable<HeroById>): Observable<Hero> {
    const hero$ = new Subject<Hero>();

    const onNext = (heroById: HeroById) => {
      const item = this.items.find(({ id }) => id === heroById.id);
      hero$.next(item);
    };
    const onComplete = () => hero$.complete();
    data$.subscribe({
      next: onNext,
      complete: onComplete,
    });

    return hero$.asObservable();
  }
}
