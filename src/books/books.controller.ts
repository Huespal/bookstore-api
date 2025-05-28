import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) { }

  @Post()
  create(@Body() createBookDto: CreateBookDto) {
    return this.booksService.create(createBookDto);
  }

  @Get()
  findAll(@Req() req: Request) {
    return this.booksService.findAll(req);
  }

  @Get(':slug')
  findOne(@Param('slug') slug: string) {
    return this.booksService.findOne(slug);
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
