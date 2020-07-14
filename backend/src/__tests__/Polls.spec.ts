import request from 'supertest';
import { advanceTo, clear } from 'jest-date-mock';

import app from '../app';
import db from '../storage/database';
import { makeRestaurant, makeUser } from '../storage/database/utils';
import Poll from '../models/Poll';

describe('Polls', () => {
  beforeEach(() => {
    db.polls = [];
    db.restaurants = [];
    db.users = [];
  });

  it('it should be able to vote only if the user is authenticated', async () => {
    const user = await makeUser();
    const restaurant = await makeRestaurant();

    db.users.push(user);
    db.restaurants.push(restaurant);

    const response = await request(app)
      .post('/polls')
      .set('Authorization', `Bearer ${user.generateToken()}`)
      .send({
        restaurant_id: restaurant.id,
      });

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        poll: {
          restaurant,
          voted_today: true,
        },
      }),
    );
    expect(db.polls.length).toEqual(1);
    expect(db.polls[0].user_id).toEqual(user.id);
    expect(db.polls[0].restaurant_id).toEqual(restaurant.id);
  });

  it('should not be able to vote if the user is not authenticated', async () => {
    const user = await makeUser();
    const restaurant = await makeRestaurant();

    db.users.push(user);
    db.restaurants.push(restaurant);

    const response = await request(app).post('/polls').send({
      restaurant_id: restaurant.id,
    });

    expect(response.status).toBe(401);
  });

  it('should not be able to vote in more than one restaurant per day', async () => {
    const user = await makeUser();
    const restaurant = await makeRestaurant();

    db.users.push(user);
    db.restaurants.push(restaurant);

    await request(app)
      .post('/polls')
      .set('Authorization', `Bearer ${user.generateToken()}`)
      .send({
        restaurant_id: restaurant.id,
      });

    const response = await request(app)
      .post('/polls')
      .set('Authorization', `Bearer ${user.generateToken()}`)
      .send({
        restaurant_id: restaurant.id,
      });

    expect(response.status).toBe(400);
    expect(response.body).toEqual(
      expect.objectContaining({
        status: 'error',
        message: expect.any(String),
      }),
    );
  });

  it('should not be able to choose a restaurant that already won in another day of the week', async () => {
    const user1 = await makeUser();
    const user2 = await makeUser();
    const user3 = await makeUser();
    const restaurant1 = await makeRestaurant();
    const restaurant2 = await makeRestaurant();
    const yesterday = new Date('2020-07-14T09:00:00.000Z');

    advanceTo(new Date('2020-07-15T09:00:00.000Z'));

    db.polls = [
      new Poll({
        restaurant_id: restaurant1.id,
        user_id: user1.id,
        date: yesterday,
      }),
      new Poll({
        restaurant_id: restaurant1.id,
        user_id: user2.id,
        date: yesterday,
      }),
      new Poll({
        restaurant_id: restaurant2.id,
        user_id: user3.id,
        date: yesterday,
      }),
    ];

    const response = await request(app)
      .post('/polls')
      .set('Authorization', `Bearer ${user3.generateToken()}`)
      .send({
        restaurant_id: restaurant1.id,
      });

    expect(response.status).toBe(400);
    expect(response.body).toEqual(
      expect.objectContaining({
        status: 'error',
        message: expect.any(String),
      }),
    );

    clear();
  });
});
