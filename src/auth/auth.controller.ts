import { Body, Controller, Post, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dtos/register.dto';

@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService) {};

  @Post('register')
  async register(@Body() dto: RegisterDto) {
    return await this.authService.register(dto);
  };

  @Post('login')
  async login(@Request() req) {
    return await this.authService.login(req.body);
  };

};
