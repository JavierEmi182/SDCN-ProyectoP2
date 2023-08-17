/* eslint-disable no-undef */
/**
 * @file Testing that Add  HTTP requests for "location" table
 * @author Gabriel Maldonado <gabamald@espol.edu.ec>
 */

const server = require('../../../app.js');
const supertest = require('supertest');
const requestWithSupertest = supertest(server);
process.env.NODE_ENV = 'test';

describe('Create  Location', () => {
  it('TC-501 POST /locations/add : successful  add', async () => {
    const result = await requestWithSupertest.get('/areas/all');
    const area1 = result.body[result.body.length - 1].area_id;
    const area2 = result.body[result.body.length - 2].area_id;

    const obj1 = {
      location_name: 'Los Olivos II',
      area_id: area1
    };

    const res1 = await requestWithSupertest.post('/locations/add').send(obj1);
    expect(res1.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res1.statusCode).toBe(201);

    const obj2 = {
      location_name: 'Riveras',
      area_id: area2
    };

    const res2 = await requestWithSupertest.post('/locations/add').send(obj2);
    expect(res2.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res2.statusCode).toBe(201);
  });

  it('TC-502 POST /locations/add : area_id does not exist ', async () => {
    const result = await requestWithSupertest.get('/areas/all');
    const flaseArea = (result.body[result.body.length - 1].area_id + 5);

    const obj = {
      location_name: 'Ceibos Norte',
      area_id: flaseArea
    };

    const res = await requestWithSupertest.post('/locations/add').send(obj);
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe('Unable to add');
  });
});
