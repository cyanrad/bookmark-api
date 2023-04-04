import { Injectable } from '@nestjs/common';
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
    let bookmarks = await this.db.bookmark.findMany({
      where: {
        userId: userId,
      },
    });

    return bookmarks;
  }

  async getBookmarkById(userId: number, bookmarkId: number) {
    let bookmark = await this.db.bookmark.findUnique({
      where: {
        id: bookmarkId,
      },
    });

    if (bookmark.userId !== userId) {
      return undefined;
    }

    return bookmark;
  }
}
