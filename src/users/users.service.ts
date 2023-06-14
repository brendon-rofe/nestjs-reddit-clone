import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {};

  async create(userData: CreateUserDto): Promise<User> {
    const newUser = this.userRepo.create(userData);
    await this.userRepo.save(newUser);
    return newUser;
  };

  async findByEmail(email: string) {
    return await this.userRepo.findOneBy({ email });
  };
};
