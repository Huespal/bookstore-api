import { Book } from 'src/books/entities/book.entity';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';

export default class BookSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    await dataSource.query('TRUNCATE "book" RESTART IDENTITY;');

    const bookFactory = await factoryManager.get(Book);
    await bookFactory.saveMany(15);
  }
}