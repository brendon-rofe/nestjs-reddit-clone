import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dtos';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {

  constructor(
    private usersService: UsersService,
  ) {};

  async register(dto: CreateUserDto) {
    return await this.usersService.create(dto);
  };

};
