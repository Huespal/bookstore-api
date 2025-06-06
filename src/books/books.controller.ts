import {
  Body, ClassSerializerInterceptor, Controller, Delete,
  Get, Param, Patch, Post, Req, UseInterceptors
} from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';
import { Request } from 'express';
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

  // TODO: Exclude @Exclude parameters from response.
  @Get()
  async findAll(@Req() req: Request) {
    const books = await this.booksService.findAll(req);
    return JSON.stringify(instanceToPlain({ books }));
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':slug')
  async findOne(@Param('slug') slug: string) {
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
