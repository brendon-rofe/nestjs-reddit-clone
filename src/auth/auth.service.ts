import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { LoginDto, RegisterDto } from './dtos';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dtos';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {};

  async validateUser(email: string, password: string) {
    const foundUser = await this.usersService.findByEmail(email);
    const passwordMatches = await bcrypt.compare(password, foundUser.hash);
    if(!passwordMatches) {
      throw new HttpException('Incorrect credentials provided', HttpStatus.BAD_REQUEST);
    };
    return foundUser;
  };

  async register(dto: RegisterDto) {
    const hash = await bcrypt.hash(dto.password, 10);
    const newUser = new CreateUserDto();
    newUser.email = dto.email;
    newUser.username = dto.username;
    newUser.hash = hash;
    return await this.usersService.create(newUser);
  };

  async login(dto: LoginDto) {
    const user = await this.validateUser(dto.email, dto.password);
    try {
      const payload = { sub: user.id, email: user.email };
      return {
        token: this.jwtService.sign(payload)
      }
    } catch (error) {
      throw new Error(`Error logging in ${error} user ${error.message}`);
    };
  };

};
