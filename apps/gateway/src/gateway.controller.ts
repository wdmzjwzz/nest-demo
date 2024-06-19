import { Controller, Get, HttpCode, HttpStatus, Req } from '@nestjs/common';
import { GatewayService } from './gateway.service';
import { extractTokenFromHeader, SuccessResponse, ErrorResponse } from '@app/common';
import { Request } from 'express';

@Controller('gateway')
export class GatewayController {
  constructor(private readonly gatewayService: GatewayService) { }


  @HttpCode(HttpStatus.OK)
  @Get('player')
  async getPlayerInfo(@Req() request: Request) {
    try {
      const token = extractTokenFromHeader(request)
      const { data } = await this.gatewayService.checkToken(token) ?? {};
      if (!data.id) {
        return new ErrorResponse('请先登录')
      }
      const player = await this.gatewayService.getPlayer(data.id)

      return new SuccessResponse(JSON.parse(player))
    } catch (error) {
      return new ErrorResponse(error.message)
    }

  }
}
