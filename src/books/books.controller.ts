import {
  Body, ClassSerializerInterceptor, Controller, Delete,
  Get, Param, Patch, Post,
  UseInterceptors
} from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';
import { GetBookDto } from 'src/books/dto/get-book.dto';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) { }

  @Post()
  async create(@Body() createBookDto: CreateBookDto) {
    return await this.booksService.create(createBookDto);
  }

  @Get()
  async findAll() {
    const books = await this.booksService.findAll();
    return JSON.stringify(instanceToPlain({ books }));
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':slug')
  async findOne(@Param() { slug }: GetBookDto) {
    const book = await this.booksService.findOne(slug);
    return book;
  }

  @Patch(':slug')
  update(@Param('slug') slug: string, @Body() updateBookDto: UpdateBookDto) {
    return this.booksService.update(slug, updateBookDto);
  }

  @Delete(':slug')
  remove(@Param('slug') slug: string) {
    return this.booksService.remove(slug);
  }
}
