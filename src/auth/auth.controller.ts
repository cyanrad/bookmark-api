import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginUser, signupUser } from './data_models';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  login(@Body() user: loginUser) {
    return this.authService.login(user);
  }

  @Post('signup')
  signup(@Body() user: signupUser) {
    return this.authService.signup(user);
  }
}
