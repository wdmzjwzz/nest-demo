import { Body, Controller, HttpCode, HttpStatus, Post, Res } from '@nestjs/common';

import { AuthServiceGrpcController, AuthServiceGrpcControllerMethods, CheckTokenReq, CheckTokenRes } from '@app/grpc';

import { Response } from 'express';
import { ErrorResponse, SuccessResponse } from '@app/common';
import { CreateUserDto } from './users/dto/create-user.dto';
import { UserService } from './users/user.service';
import { Public } from './decorators/public.decorator';
import { AuthService } from './auth.service';

@Controller('define')
@AuthServiceGrpcControllerMethods()
export class AuthController implements AuthServiceGrpcController {
  constructor(private readonly authService: AuthService) { }

  async checkToken({ token }: CheckTokenReq): Promise<CheckTokenRes> {
    return {
      data: {
        account: '1111111'
      },
    }
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('regist')
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      await this.authService.register(createUserDto);
      return new SuccessResponse('注册成功！')
    } catch (error) {
      return new ErrorResponse(error.message)
    }

  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() createUserDto: CreateUserDto) {
    try {
      const token = await this.authService.signIn(createUserDto); 
      return new SuccessResponse(token)
    } catch (error) {
      return new ErrorResponse(error.message)
    }

  }
}
