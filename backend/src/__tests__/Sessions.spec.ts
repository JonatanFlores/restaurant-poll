import request from 'supertest';

import app from '../app';
import db from '../storage/database';
import { makeUser } from '../storage/database/utils';

describe('Sessions', () => {
  beforeEach(() => {
    db.users = [];
  });

  it('should be able to authenticate with valid credentials', async () => {
    const user = await makeUser();

    db.users.push(user);

    const response = await request(app).post('/sessions').send({
      email: user.email,
      password: '123456',
    });

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
        token: expect.any(String),
      }),
    );
  });

  it('should not be able to authenticate with wrong email', async () => {
    const user = await makeUser();

    db.users.push(user);

    const response = await request(app).post('/sessions').send({
      email: 'johndoe@testserver.com',
      password: '123456',
    });

    expect(response.status).toBe(401);
    expect(response.body).toEqual(
      expect.objectContaining({
        status: 'error',
        message: 'Incorrect email/password combination',
      }),
    );
  });

  it('should not be able to authenticate with wrong password', async () => {
    const user = await makeUser();

    db.users.push(user);

    const response = await request(app).post('/sessions').send({
      email: user.email,
      password: '123',
    });

    expect(response.status).toBe(401);
    expect(response.body).toEqual(
      expect.objectContaining({
        status: 'error',
        message: 'Incorrect email/password combination',
      }),
    );
  });
});
