import { Injectable, UnauthorizedException } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { User } from '../users/entity/user.entity';
import { UserService } from '../users/user.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) { }

  async register(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    Object.assign(user, createUserDto)
    user.createTime = String(new Date().getTime());
    return this.usersService.create(user);
  }

  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }
  findOneByEmail(email: string): Promise<User> {
    return this.usersService.findOneByEmail(email);
  }
  async signIn(createUserDto: CreateUserDto, userId: number): Promise<string> {
    const payload = { email: createUserDto.email, sub: userId };
    const token = await this.jwtService.signAsync(payload)
    return token
  }
}
