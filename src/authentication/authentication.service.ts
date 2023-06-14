import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dtos/register.dto'
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthenticationService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {};

  async register(registrationData: RegisterDto) {
    const hashedPassword = await bcrypt.hash(registrationData.password, 10);
    const newUser = await this.usersService.create({
      ...registrationData,
      passwordHash: hashedPassword
    });
    newUser.passwordHash = undefined;
    return newUser;
  };

  async validateUser(username: string, password: string) {
    const user = await this.usersService.findByUsername(username);
    if(user && await bcrypt.compare(password, user.passwordHash)) {
      user.passwordHash = undefined;
      return user;
    }
  };

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload)
    }
  };
};
