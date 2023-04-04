require('dotenv').config({ path: `../${process.env.NODE_ENV}.env` });
import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { DbModule } from './db/db.module';
import { ConfigModule } from '@nestjs/config';

const path = require('path');
let envType = process.env.NODE_ENV;
let relativeEnvPath = ('../.env.' + envType).slice(0, -1); // removing a space at the end
let absoluteEnvPath: string = path.join(__dirname, relativeEnvPath);

@Module({
  imports: [
    AuthModule,
    UserModule,
    DbModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: absoluteEnvPath,
    }),
  ],
})
export class AppModule {}
