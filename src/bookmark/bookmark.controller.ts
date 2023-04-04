import { Body, Controller, Post, UseGuards } from '@nestjs/common';
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
}
