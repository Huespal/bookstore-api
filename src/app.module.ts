import { Module } from '@nestjs/common';
import { DbModule } from 'src/db/db.module';
import { ImagesModule } from 'src/images/images.module';
import { BooksModule } from './books/books.module';

@Module({
  imports: [DbModule, BooksModule, ImagesModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
