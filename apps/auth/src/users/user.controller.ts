import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthServiceGrpcController, AuthServiceGrpcControllerMethods, CheckTokenReq, CheckTokenRes } from '@app/grpc';
import { CreateUserDto } from './dto/create-user.dto';
import { QueryFailedError } from 'typeorm';
import { Response } from 'express';
import { ErrorResponse, SuccessResponse } from '@app/common';

@Controller('user')
@AuthServiceGrpcControllerMethods()
export class UserController implements AuthServiceGrpcController {
  constructor(private readonly userService: UserService) { }

  async checkToken({ token }: CheckTokenReq): Promise<CheckTokenRes> {
    const data = await this.userService.findAll();
    console.log(data, '数据库=====')
    return {
      data: {
        account: '1111111'
      },
    }
  }

  @Post('regist')
  async create(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    try {
      await this.userService.create(createUserDto);
      res.status(HttpStatus.OK).json(new SuccessResponse('注册成功！'))
    } catch (error) {
      if (error instanceof QueryFailedError) {
        res.status(HttpStatus.BAD_REQUEST).send(new ErrorResponse(error.message))
        return;
      }
      res.status(HttpStatus.OK).send(new ErrorResponse(error.message))
    }

  }
}
