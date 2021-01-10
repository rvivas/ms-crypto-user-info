const express = require('express');
const UserInfo = require('../models/user');
const app = express();
const bcrypt = require('bcrypt');
const request = require('supertest');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(require('../paths/login'));

jest.mock('../models/user');
jest.mock('bcrypt');
describe('Login test', () => {
  test('Login - Ok', async () => {
    const req = {
      username: 'trader',
      password: '123456',
    };
    const resp = {
      ok: true,
      usuario: {
        username: 'trader',
        balance: 1000,
        country: 'USA',
      },
    };
    jest.spyOn(UserInfo, 'findOne').mockResolvedValue({ username: 'trader', balance: 1000, country: 'USA' });
    jest.spyOn(bcrypt, 'compare').mockReturnValue(true);
    const { body } = await request(app).post('/login').send(req);
    expect(body).toEqual(resp);
  });

  test('Login - Error User not found', async () => {
    const req = {
      username: 'usernotregistred',
      password: '1234546',
    };

    const resp = {
      ok: false,
      message: 'Invalid user or credentials',
    };
    jest.spyOn(UserInfo, 'findOne').mockResolvedValue(null);
    const { body } = await request(app).post('/login').send(req);
    expect(body).toEqual(resp);
  });

  test('Login - Invalid Password', async () => {
    const req = {
      username: 'trader',
      password: '123456',
    };

    const resp = {
      ok: false,
      message: 'Invalid user or credentials',
    };
    jest.spyOn(UserInfo, 'findOne').mockResolvedValue({ username: 'trader', balance: 1000, country: 'USA' });
    jest.spyOn(bcrypt, 'compare').mockReturnValue(false);
    const { body } = await request(app).post('/login').send(req);
    expect(body).toEqual(resp);
  });

  test('Login - Error in server', async () => {
    const req = {
      username: 'trader',
      password: '1234546',
    };

    const resp = {
      ok: false,
      message: 'Error in server',
    };
    jest.spyOn(UserInfo, 'findOne').mockRejectedValue('Error in server');
    jest.spyOn(bcrypt, 'compare').mockReturnValue(false);
    const { body } = await request(app).post('/login').send(req);
    expect(body).toEqual(resp);
  });
});
