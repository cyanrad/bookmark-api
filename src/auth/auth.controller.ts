import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { signupUser } from './data_models';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  login() {
    return this.authService.login();
  }

  @Post('signup')
  signup(@Body() user: signupUser) {
    return this.authService.signup(user);
  }
}
