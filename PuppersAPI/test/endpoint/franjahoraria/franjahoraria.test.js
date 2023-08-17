/* eslint-disable no-undef */
/**
 * @file Testing that Add  HTTP requests for "franjaHoraria" table
 * @author Gabriel Maldonado <gabamald@espol.edu.ec>
 */

const server = require('../../../app.js');
const supertest = require('supertest');
const requestWithSupertest = supertest(server);
process.env.NODE_ENV = 'test';

describe('Create franjaHoraria', () => {
  it('TC-401 POST /franjaHoraria/add : successful  add', async () => {
    const obj1 = {
      start_minute: 9 * 60 + 0,
      end_minute: 10 * 60 + 20
    };

    const res1 = await requestWithSupertest.post('/franjaHoraria/add').send(obj1);
    expect(res1.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res1.statusCode).toBe(201);
    expect(res1.body.convertido).toBe('9:00-10:20');

    const obj2 = {
      start_minute: 14 * 60 + 5,
      end_minute: 15 * 60 + 7
    };

    const res2 = await requestWithSupertest.post('/franjaHoraria/add').send(obj2);
    expect(res2.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res2.statusCode).toBe(201);
    expect(res2.body.convertido).toBe('14:05-15:07');
  });

  it('TC-402 POST /franjaHoraria/add : time range not valid ', async () => {
    const obj = {
      start_minute: 10 * 60 + 20,
      end_minute: 9 * 60 + 0
    };

    const res = await requestWithSupertest.post('/franjaHoraria/add').send(obj);
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(409);
    expect(res.body.error).toBe('Time range not valid');
  });

  it('TC-403 POST /franjaHoraria/add : time range out of bounds ', async () => {
    const obj = {
      start_minute: 10 * 60 + 20,
      end_minute: 24 * 60 + 0
    };

    const res = await requestWithSupertest.post('/franjaHoraria/add').send(obj);
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(422);
  });
});
