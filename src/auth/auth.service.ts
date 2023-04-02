import { Injectable, ForbiddenException } from '@nestjs/common';
import { loginUser, signupUser } from './data_models';
import * as argon from 'argon2';
import { DbService } from 'src/db/db.service';
import { Prisma } from '@prisma/client';

@Injectable({})
export class AuthService {
  constructor(private db: DbService) {}

  async login(user: loginUser) {
    const foundUser = await this.db.user.findUnique({
      where: {
        email: user.email,
      },
    });
    if (!foundUser) throw new ForbiddenException('wrong credentials');

    if (await argon.verify(foundUser.hash, user.password)) {
      delete foundUser.hash;
      return {
        message: "you're logged in!",
        foundUser,
      };
    } else {
      throw new ForbiddenException('wrong credentials');
    }
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
