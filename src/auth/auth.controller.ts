import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginUser, signupUser } from './data_models';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @HttpCode(200)
  login(@Body() user: loginUser) {
    return this.authService.login(user);
  }

  @Post('signup')
  signup(@Body() user: signupUser) {
    return this.authService.signup(user);
  }
}
