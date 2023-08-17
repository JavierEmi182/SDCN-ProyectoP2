/* eslint-disable no-undef */

/**
 * @file Testing  Create  HTTP requests for "clientes" table
 * @author Gabriel Maldonado <gabamald@espol.edu.ec>
 */

const server = require('../../../app.js');
const supertest = require('supertest');
const requestWithSupertest = supertest(server);
process.env.NODE_ENV = 'test';

describe('Create request Clientes', () => {
  it('TC-301 POST /clientes/add: new cliente', async () => {
    const result = await requestWithSupertest.get('/locations/all');
    const location = result.body[result.body.length - 1];

    const obj1 = {
      client_tel: '0953914964',
      client_ID: '8399830756',
      client_name: 'Mario Moreno',
      start_date: new Date(),
      client_user: 'eholy2587fe',
      client_password: '65484245',
      location_id: location.location_id,
      address_link: 'https://adreees.com'
    };

    const res1 = await requestWithSupertest.post('/clientes/add').send(obj1);
    expect(res1.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res1.statusCode).toBe(201);
    expect(res1.body.client_ID).toBe('8399830756');
  });

  it('TC-302 POST /clientes/add : client_ID already in use', async () => {
    const result = await requestWithSupertest.get('/locations/all');
    const location = result.body[result.body.length - 1];

    const obj1 = {
      client_tel: '9384991551',
      client_ID: '1690302889',
      client_name: 'Maria Yuta',
      start_date: new Date(),
      client_user: 'superMario',
      client_password: '98554789',
      location_id: location.location_id,
      address_link: 'https://adreees3.com'
    };

    const res1 = await requestWithSupertest.post('/clientes/add').send(obj1);
    expect(res1.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res1.statusCode).toBe(400);
    expect(res1.body.error).toBe('Unable to add');
  });

  it('TC-303 POST /clientes/add: client_user already in use', async () => {
    const result = await requestWithSupertest.get('/locations/all');
    const location = result.body[result.body.length - 1];

    const obj1 = {
      client_tel: '0953987964',
      client_ID: '8399838956',
      client_name: 'Mario Moreno',
      start_date: new Date(),
      client_user: 'kgoulbourn2',
      client_password: '65484245',
      location_id: location.location_id,
      address_link: 'https://adreees.com/898/89'
    };

    const res1 = await requestWithSupertest.post('/clientes/add').send(obj1);
    expect(res1.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res1.statusCode).toBe(409);
    expect(res1.body.error).toBe('User not valid');
  });
});
