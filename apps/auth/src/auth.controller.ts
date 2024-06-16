import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

import { AuthServiceGrpcController, AuthServiceGrpcControllerMethods, CheckTokenReq, CheckTokenRes } from '@app/grpc';
import { ErrorResponse, SuccessResponse } from '@app/common';
import { CreateUserDto } from './users/dto/create-user.dto';
import { Public } from './decorators/public.decorator';
import { AuthService } from './services/auth.service';
import { VertifyCodeService } from './services/vertifyCodeService';
import { Observable, of } from 'rxjs';

@Controller('define')
@AuthServiceGrpcControllerMethods()
export class AuthController implements AuthServiceGrpcController {
  constructor(
    private readonly authService: AuthService,
    private codeService: VertifyCodeService
  ) { }

  async checkToken({ token }: CheckTokenReq): Promise<CheckTokenRes> {
    const res = await this.authService.vertifyToken(token); 
    return {
      data: {
        account: res.email,
      },
    }
  }


  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() createUserDto: CreateUserDto) {
    try {
      const { email, code } = createUserDto;
      const targetCode = this.codeService.getCodeInfo(email);
      const now = new Date().getTime();
      const isVertify = (now - targetCode?.createTime <= 5 * 60 * 1000) && Number(targetCode.code) === Number(code);

      if (!targetCode || !code || !isVertify) {
        return new SuccessResponse('验证码错误或失效')
      }
      let user = await this.authService.findOneByEmail(email);
      if (!user) {
        user = await this.authService.register(createUserDto);
      }
      const token = await this.authService.signIn(createUserDto, user.id);
      return new SuccessResponse(token)
    } catch (error) {
      return new ErrorResponse(error.message)
    }

  }
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('code')
  async code(@Body() createUserDto: CreateUserDto) {
    try {
      const { email } = createUserDto;
      if (!email) {
        return new ErrorResponse('email is undefind')
      }
      const code = this.codeService.createVertifyCode();
      await this.codeService.sendMail([email], '验证码', `<div>您的验证码为：</div><h2 style="margin: 20px;">${code}</h2><div>五分钟内有效</div>`)
      this.codeService.setCode(email, code);
      return new SuccessResponse('发送成功！')
    } catch (error) {
      return new ErrorResponse(error.message)
    }

  }
}
