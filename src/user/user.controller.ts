import { UseGuards, Get, Controller, Patch, Body } from '@nestjs/common';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { User } from '@prisma/client';
import { editMeDTO } from './user.dto';
import { DbService } from 'src/db/db.service';
import { UserService } from './user.service';

@UseGuards(JwtGuard)
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('me')
  getMe(@GetUser() user: User) {
    return user;
  }

  @Patch('edit')
  editMe(@GetUser('id') userId: number, @Body() data: editMeDTO) {
    return this.userService.editMe(userId, data);
  }
}
