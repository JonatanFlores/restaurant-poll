import faker from 'faker';
import { hash } from 'bcryptjs';
import { uuid } from 'uuidv4';

import Restaurant from '../../models/Restaurant';
import User from '../../models/User';

export async function makeRestaurant(override = {}): Promise<Restaurant> {
  return {
    id: uuid(),
    name: faker.company.companyName(),
    ...override,
  };
}

export async function makeUser(override = {}): Promise<User> {
  const user = new User({
    id: uuid(),
    name: faker.name.findName(),
    email: faker.internet.email(),
    password: await hash('123456', 8),
    ...override,
  });

  return user;
}
