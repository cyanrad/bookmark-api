import { Injectable, ForbiddenException } from '@nestjs/common';
import { loginUser, signupUser } from './data_models';
import * as argon from 'argon2';
import { DbService } from 'src/db/db.service';
import { Prisma } from '@prisma/client';
import { JwtService } from '@nestjs/jwt/dist';
import { ConfigService } from '@nestjs/config';

@Injectable({})
export class AuthService {
  constructor(
    private db: DbService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async login(user: loginUser) {
    const foundUser = await this.db.user.findUnique({
      where: {
        email: user.email,
      },
    });
    if (!foundUser) throw new ForbiddenException('wrong credentials');

    if (await argon.verify(foundUser.hash, user.password)) {
      return this.getToken(foundUser.id, foundUser.email);
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

  // not my best work, but i like it
  async getToken(
    userId: number,
    email: string,
  ): Promise<{ access_token: string }> {
    return {
      access_token: await this.jwt.signAsync(
        {
          sub: userId,
          email: email,
        },
        {
          expiresIn: '15',
          secret: this.config.get<string>('JWT_SECRET'),
        },
      ),
    };
  }
}
