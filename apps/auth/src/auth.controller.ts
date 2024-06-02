import { Controller, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthServiceGrpcController, AuthServiceGrpcControllerMethods, CheckTokenReq, CheckTokenRes } from '@app/grpc';
import { Observable } from 'rxjs';

@Controller()
@AuthServiceGrpcControllerMethods()
export class AuthController implements AuthServiceGrpcController {
  constructor(private readonly authService: AuthService) { }

  private readonly respone: CheckTokenRes = {
    data: {
      account: '1111111'
    },
  }

  checkToken({ token }: CheckTokenReq): CheckTokenRes | Observable<CheckTokenRes> | Promise<CheckTokenRes> {
    console.log(token, 5555)
    return this.respone
  }

  @Get()
  getHello(): string {
    return this.authService.getHello();
  }
}
