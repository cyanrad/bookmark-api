require('dotenv').config({ path: `../${process.env.NODE_ENV}.env` });
import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { DbModule } from './db/db.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    AuthModule,
    UserModule,
    DbModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
})
export class AppModule {}
