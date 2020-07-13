import request from 'supertest';

import app from '../app';
import db from '../storage/database';
import { makeRestaurant } from '../storage/database/utils';

describe('Restaurants', () => {
  beforeEach(() => {
    db.polls = [];
    db.restaurants = [];
    db.users = [];
  });

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
