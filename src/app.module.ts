import { Module } from '@nestjs/common';
import { DbModule } from 'src/db/db.module';
import { BooksModule } from './books/books.module';

@Module({
  imports: [DbModule, BooksModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
