import request from 'supertest';

import app from '../app';
import db from '../storage/database';
import { makeUser } from '../storage/database/utils';

describe('Me', () => {
  it('it should return the current logged in user', async () => {
    const user = await makeUser();

    db.users.push(user);

    const response = await request(app)
      .get('/me')
      .set('Authorization', `Bearer ${user.generateToken()}`);

    delete user.password;

    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.objectContaining({ user }));
  });

  it('it should not return a user if not authenticated', async () => {
    const user = await makeUser();

    db.users.push(user);

    const response = await request(app).get('/me');

    delete user.password;

    expect(response.status).toBe(401);
  });
});
