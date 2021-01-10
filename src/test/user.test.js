const express = require('express');
const UserInfo = require('../models/user');
const app = express();
const request = require('supertest');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(require('../paths/user'));

jest.mock('../models/user');
describe('User Test', () => {
  test('Increase Balance', async () => {
    const req = {
      username: 'trader',
      addToBalance: 1000,
    };
    const resp = {
      ok: true,
      username: 'trader',
      balance: 1100,
      message: 'Balance updated',
    };
    jest.spyOn(UserInfo, 'findOne').mockResolvedValue({ username: 'trader', balance: 100 });
    jest.spyOn(UserInfo, 'findOneAndUpdate').mockResolvedValue({ username: 'trader', balance: 1100 });
    const { body } = await request(app).put('/incraseBalance').send(req);
    console.log('este es el body', body);
    expect(body).toEqual(resp);
  });

  test('Increase Balance - Error User not found', async () => {
    const req = {
      username: 'usernotregistred',
      addToBalance: 1000,
    };

    const resp = {
      ok: false,
      message: 'User not found',
    };
    jest.spyOn(UserInfo, 'findOne').mockResolvedValue(null);
    const { body } = await request(app).put('/incraseBalance').send(req);
    expect(body).toEqual(resp);
  });

  test('Increase Balance - Error in Server', async () => {
    const req = {
      username: 'usernotregistred',
      addToBalance: 1000,
    };

    const resp = {
      ok: false,
      message: 'Error in server',
    };
    jest.spyOn(UserInfo, 'findOne').mockRejectedValue('Error in server');
    const { body } = await request(app).put('/incraseBalance').send(req);
    expect(body).toEqual(resp);
  });
  test('Decrease Balance', async () => {
    const req = {
      username: 'trader',
      addToBalance: 50,
    };
    const resp = {
      ok: true,
      username: 'trader',
      balance: 50,
      message: 'Balance updated',
    };

    jest.spyOn(UserInfo, 'findOne').mockResolvedValue({ username: 'trader', balance: 100 });
    jest.spyOn(UserInfo, 'findOneAndUpdate').mockResolvedValue({ username: 'trader', balance: 50 });
    const { body } = await request(app).put('/decreaseBalance').send(req);
    expect(body).toEqual(resp);
  });

  test('Decrease Balance - Error User not found', async () => {
    const req = {
      username: 'usernotregistred',
      addToBalance: 50,
    };

    const resp = {
      ok: false,
      message: 'User not found',
    };
    jest.spyOn(UserInfo, 'findOne').mockResolvedValue(null);
    const { body } = await request(app).put('/decreaseBalance').send(req);
    expect(body).toEqual(resp);
  });

  test('Decrease Balance - Error in Server', async () => {
    const req = {
      username: 'usernotregistred',
      addToBalance: 1000,
    };

    const resp = {
      ok: false,
      message: 'Error in server',
    };
    jest.spyOn(UserInfo, 'findOne').mockRejectedValue('Error in server');
    const { body } = await request(app).put('/decreaseBalance').send(req);
    expect(body).toEqual(resp);
  });
});
