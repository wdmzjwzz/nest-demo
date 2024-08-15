import { Controller, Get, HttpCode, HttpStatus, Req } from '@nestjs/common';
import { GatewayService } from './gateway.service';
import { SuccessResponse, ErrorResponse, extractTokenFromHeader } from '@app/common';
import { Public } from 'apps/auth/src/decorators/public.decorator';
import { Request } from 'express';
@Controller('gateway')
export class GatewayController {
  constructor(private readonly gatewayService: GatewayService) { }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Get('player')
  async getPlayer(@Req() request: Request) {
    try {
      const token = extractTokenFromHeader(request);
      const { data } = await this.gatewayService.checkToken(token);
      const player = await this.gatewayService.getPlayer(data.id);
      return new SuccessResponse(JSON.parse(player))
    } catch (error) {
      return new ErrorResponse(error.message)
    }

  }
}
