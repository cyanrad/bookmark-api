import { ForbiddenException, Injectable } from '@nestjs/common';
import { createBookmarkDto } from './bookmark.dto';
import { DbService } from 'src/db/db.service';

@Injectable()
export class BookmarkService {
  constructor(private db: DbService) {}

  async createBookmark(userId: number, data: createBookmarkDto) {
    let bookmark = await this.db.bookmark.create({
      data: {
        userId: userId,
        ...data,
      },
    });

    return bookmark;
  }

  async getBookmarks(userId: number) {
    let user = this.db.user.findUnique({
      where: {
        id: userId,
      },
    });

    console.log(user.bookmark());
    return user.bookmark();
  }

  async getBookmarkById(userId: number, bookmarkId: number) {
    let bookmark = await this.db.bookmark.findUnique({
      where: {
        id: bookmarkId,
      },
    });

    if (!bookmark || bookmark.userId !== userId) {
      throw new ForbiddenException('Access to resource denied');
    }

    return bookmark;
  }
}
