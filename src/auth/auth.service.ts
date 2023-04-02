import { Injectable, ForbiddenException } from '@nestjs/common';
import { signupUser } from './data_models';
import * as argon from 'argon2';
import { DbService } from 'src/db/db.service';
import { Prisma } from '@prisma/client';

@Injectable({})
export class AuthService {
  constructor(private db: DbService) {}
  login() {
    return { message: "CONGRATS, you're logged in" };
  }

  async signup(user: signupUser) {
    const hash = await argon.hash(user.password);

    try {
      const newUser = await this.db.user.create({
        data: {
          email: user.email,
          hash: hash,
          fristName: user.firstName,
          lastName: user.lastName,
        },
      });

      delete newUser.hash;
      return newUser;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('credentials taken');
        }
      }
    }
  }
}
