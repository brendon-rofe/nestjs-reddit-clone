import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dtos/register.dto';

@Injectable()
export class AuthenticationService {
  constructor(private usersService: UsersService) {};

  async register(registrationData: RegisterDto) {
    const hashedPassword = await bcrypt.hash(registrationData.password, 10);
    const newUser = await this.usersService.create({
      ...registrationData,
      passwordHash: hashedPassword
    });
    newUser.passwordHash = undefined;
    return newUser;
  };
};
