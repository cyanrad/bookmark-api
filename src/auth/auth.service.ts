import { Injectable } from '@nestjs/common';

@Injectable({})
export class AuthService {
  login() {
    return { message: "CONGRATS, you're logged in" };
  }

  signup() {
    return { message: "You're signed up already" };
  }
}
