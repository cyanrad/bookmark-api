import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { editMeDTO } from './user.dto';

@Injectable()
export class UserService {
  constructor(private db: DbService) {}

  async editMe(userId: number, dto: editMeDTO) {
    const user = await this.db.user.update({
      where: {
        id: userId,
      },
      data: {
        ...dto,
      },
    });

    delete user.hash;
    return user;
  }
}
