import { Book } from 'src/books/entities/book.entity';
import { setSeederFactory } from 'typeorm-extension';

export default setSeederFactory(Book, (faker) => {
  const book = new Book();

  book.id = faker.string.uuid();
  book.cover = faker.image.url();
  book.title = faker.music.songName();
  book.slug = faker.lorem.slug({ min: 1, max: 3 });
  book.author = `${faker.person.firstName()} ${faker.person.lastName()}`;
  book.rating = faker.number.int({ max: 10 }).toString();
  book.synopsis = faker.lorem.paragraph();
  book.upvoted = faker.datatype.boolean();
  book.upvotes = faker.number.int({ max: 99999 });

  return book;
})