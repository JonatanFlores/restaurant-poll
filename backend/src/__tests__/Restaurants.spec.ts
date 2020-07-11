import request from 'supertest';
import faker from 'faker';
import { uuid } from 'uuidv4';

import app from '../app';
import db from '../storage/database';
import Restaurant from '../models/Restaurant';

async function makeRestaurant(override = {}): Promise<Restaurant> {
  return {
    id: uuid(),
    name: faker.company.companyName(),
    ...override,
  };
}

describe('Restaurants', () => {
  it('should display a list of restaurants', async () => {
    const restaurant = await makeRestaurant();

    db.restaurants.push(restaurant);

    const response = await request(app).get('/restaurants');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.arrayContaining([expect.objectContaining(restaurant)]),
    );
  });
});
