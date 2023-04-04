import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  imports: [JwtModule.register({})],
  providers: [UserService],
})
export class UserModule {}
