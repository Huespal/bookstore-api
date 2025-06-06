import { config } from 'dotenv';
import { Book } from 'src/books/entities/book.entity';
import bookFactory from 'src/db/factories/book.factory';
import BookSeeder from 'src/db/seeds/book.seeder';
import { DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';

config();

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT
    ? parseInt(process.env.DB_PORT, 10)
    : 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [Book],
  migrations: [],
  synchronize: process.env.MODE === 'development'
};

export const dataSourceOptionsForSeeds: DataSourceOptions & SeederOptions = {
  ...dataSourceOptions,
  entities: [Book],
  seeds: [BookSeeder],
  seedTracking: false,
  factories: [bookFactory],
};