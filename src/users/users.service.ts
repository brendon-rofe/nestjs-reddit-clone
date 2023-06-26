import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { CreateUserDto } from './dtos';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {

  constructor(@InjectRepository(UserEntity) private usersRepo: Repository<UserEntity>) {};

  async create(dto: CreateUserDto) {
    const newUser = new UserEntity();
    newUser.email = dto.email;
    newUser.username = dto.username;
    newUser.hash = bcrypt.hashSync(dto.password, 10);
    await this.usersRepo.create(newUser);
    await this.usersRepo.save(newUser);
    newUser.hash = undefined;
    return newUser;
  };

  async findByEmail(email: string) {
    const user = await this.usersRepo.findOneBy({ email });
    if(!user) {
      throw new HttpException(`User with email: ${email} not found`, HttpStatus.NOT_FOUND);
    };
    return user;
  };

};
