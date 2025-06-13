import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from 'src/books/entities/book.entity';
import { sanitizeStr } from 'src/helpers';
import { Repository } from 'typeorm';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private booksRepository: Repository<Book>,
  ) { }

  async create(createBookDto: CreateBookDto) {
    const book: Book = new Book();
    book.author = createBookDto.author;
    book.cover = sanitizeStr(createBookDto.cover);
    book.rating = createBookDto.rating;
    book.synopsis = createBookDto.synopsis;
    book.title = createBookDto.title;
    book.slug = sanitizeStr(createBookDto.title);
    book.upvoted = false;
    book.upvotes = 0;
    const { id } = await this.booksRepository.save(book);
    return { id };
  }

  async findAll() {
    return await this.booksRepository.find();
  }

  async findOne(slug: string) {
    return await this.booksRepository.findOneBy({ slug });
  }

  async update(slug: string, updateBookDto: UpdateBookDto) {
    const book = await this.booksRepository.findOneByOrFail({ slug });

    await this.booksRepository.save({ ...book, ...updateBookDto });
  }

  async remove(slug: string): Promise<void> {
    await this.booksRepository.delete(slug);
  }
}
