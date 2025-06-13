import * as bcrypt from 'bcrypt';
import { User } from 'src/users/entities/user.entity';
import { setSeederFactory } from 'typeorm-extension';

export default setSeederFactory(User, async faker => {
  const user = new User();

  const firstName = faker.person.firstName();
  const password = faker.internet.password();
  const hashedPassword = await bcrypt.hash(password, 10);

  user.id = faker.string.uuid();
  user.username = firstName.toLowerCase();
  user.firstName = firstName;
  user.lastName = faker.person.lastName();
  user.password = hashedPassword;
  user.refreshToken = '';

  return user;
})