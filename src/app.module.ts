import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { BooksModule } from 'src/books/books.module';
import { DbModule } from 'src/db/db.module';
import { ImagesModule } from 'src/images/images.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [DbModule, UsersModule, AuthModule, BooksModule, ImagesModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
