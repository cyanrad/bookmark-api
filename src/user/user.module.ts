import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [UserController],
  imports: [JwtModule.register({})],
})
export class UserModule {}
