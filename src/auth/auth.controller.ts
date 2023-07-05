import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dtos';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService) {};

  @Post('register')
  async register(@Body() dto: RegisterDto) {
    return await this.authService.register(dto);
  };

  // @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Body() dto: LoginDto) {
    return await this.authService.login(dto);
  };

};
