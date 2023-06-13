import { Body, Controller, Post } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { RegisterDto } from './dtos/register.dto';
import { User } from 'src/users/user.entity';

@Controller('authentication')
export class AuthenticationController {
  constructor(private authService: AuthenticationService) {};

  @Post('/register')
  async register(@Body() registrationData: RegisterDto): Promise<User> {
    return await this.authService.register(registrationData);
  };
};
