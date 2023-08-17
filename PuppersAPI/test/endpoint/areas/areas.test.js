/* eslint-disable no-undef */
/**
 * @file Testing that Add  HTTP requests for "area" table
 * @author Gabriel Maldonado <gabamald@espol.edu.ec>
 */

const server = require('../../../app.js');
const supertest = require('supertest');
const requestWithSupertest = supertest(server);
process.env.NODE_ENV = 'test';

describe('Create Area', () => {
  it('TC-201 POST /areas/add : successful add', async () => {
    const obj1 = {
      area_name: 'Miraflores'
    };

    const res1 = await requestWithSupertest.post('/areas/add').send(obj1);
    expect(res1.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res1.statusCode).toBe(201);

    const obj2 = {
      area_name: 'Urdesa'
    };

    const res2 = await requestWithSupertest.post('/areas/add').send(obj2);
    expect(res2.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res2.statusCode).toBe(201);
  });

  it('TC-202 POST /areas/add : location already exist', async () => {
    const obj1 = {
      area_name: 'Ceibos'
    };

    const res1 = await requestWithSupertest.post('/areas/add').send(obj1);
    expect(res1.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res1.statusCode).toBe(400);
  });
});
