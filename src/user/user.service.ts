import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';

@Injectable()
export class UserService {
  constructor(private db: DbService) {}

  async editMe(userId: number, data: Body) {
    const user = await this.db.user.update({
      where: {
        id: userId,
      },
      data: {
        ...data,
      },
    });

    delete user.hash;
    return user;
  }
}
