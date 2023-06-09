import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  HttpCode,
  Param,
} from '@nestjs/common';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { createBookmarkDto } from './bookmark.dto';
import { BookmarkService } from './bookmark.service';

@UseGuards(JwtGuard)
@Controller('bookmark')
export class BookmarkController {
  constructor(private bookmark: BookmarkService) {}

  @Post()
  createBookmark(
    @GetUser('id') userId: number,
    @Body() data: createBookmarkDto,
  ) {
    return this.bookmark.createBookmark(userId, data);
  }

  @Get()
  @HttpCode(200)
  getBookmarks(@GetUser('id') userId: number) {
    return this.bookmark.getBookmarks(userId);
  }

  @Get(':id')
  @HttpCode(200)
  getBookmarkById(
    @GetUser('id') userId: number,
    @Param('id') bookmarkId: number,
  ) {
    return this.bookmark.getBookmarkById(userId, Number(bookmarkId));
  }
}
