import { Global, Module } from '@nestjs/common';
import { DbService } from './db.service';
import { ConfigModule } from '@nestjs/config';

@Global()
@Module({
  providers: [DbService],
  exports: [DbService],
})
export class DbModule {}
