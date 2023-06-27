import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginDto, RegisterDto } from './dtos';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {};

  async validateUser(dto: LoginDto) {
    const user = await this.usersService.findByEmail(dto.email);
    const passwordsMatch = await bcrypt.compareSync(dto.password, user.hash);
    if(!passwordsMatch) {
      throw new HttpException('Incorrect credentials', HttpStatus.BAD_REQUEST);
    };
  };

  async register(dto: RegisterDto) {
    return await this.usersService.create(dto);
  };

  async login(user: any) {
    await this.validateUser(user);
    const payload = { email: user.email, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload)
    };
  };

};
