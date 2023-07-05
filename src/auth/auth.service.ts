import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginDto, RegisterDto } from './dtos';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from 'src/users/dtos';

@Injectable()
export class AuthService {

  constructor(private usersService: UsersService) {};

  async validateUser(email, password) {
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
    
  };

};
