import { Injectable, Req } from '@nestjs/common';
import { Request } from 'express';
import fs from 'fs';
import path from 'path';
import { Book } from 'src/books/entities/book.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

const BOOKS_FILE_PATH = path.resolve(__dirname, './data/books.json');

function readBooksFile() {
  return fs.readFileSync(BOOKS_FILE_PATH, 'utf8');
}

@Injectable()
export class BooksService {
  private readonly bookList: { books: Book[] } = JSON.parse(readBooksFile());

  create(createBookDto: CreateBookDto) {
    this.bookList.books.push({
      ...createBookDto,
      slug: createBookDto.title.toLowerCase().replaceAll(' ', '-'),
      upvoted: false,
      upvotes: 0
    });
    return this.bookList.books;
  }

  findAll(@Req() req: Request) {
    const url = `${req.protocol}://${req.get('Host')}`;
    this.bookList.books.map(book => ({
      ...book,
      cover: book.cover.startsWith(url)
        ? book.cover
        : `${url}/images/${book.cover}`
    }));

    return JSON.stringify(this.bookList);
  }

  findOne(slug: string) {
    const book = this.bookList.books.find(b => b.slug === slug);
    if (!book) {
      throw Error('404');
    }

    return book;
  }

  update(slug: string, updateBookDto: UpdateBookDto) {
    const bookIndex = this.bookList.books.findIndex(book => book.slug === slug);
    if (bookIndex < 0) {
      throw Error('404');
    }
    this.bookList.books[bookIndex] = {
      ...this.bookList.books[bookIndex],
      ...updateBookDto
    }

    return this.bookList.books[bookIndex];
  }

  remove(slug: string) {
    return this.bookList.books.filter(book => book.slug !== slug);
  }
}
