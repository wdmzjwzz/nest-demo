import { Controller, Get } from '@nestjs/common';
import { GatewayService } from './gateway.service';

@Controller()
export class GatewayController {
  constructor(private readonly gatewayService: GatewayService) { }

  @Get()
  getHello(): string {
    const data = this.gatewayService.getHero()
    data.subscribe(item => console.log(item, 222222))
    return this.gatewayService.getHello();
  }
}
