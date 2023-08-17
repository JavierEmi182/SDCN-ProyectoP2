/* eslint-disable no-undef */
/**
 * @file Testing Update  HTTP requests for "clientes" table
 * @author Gabriel Maldonado <gabamald@espol.edu.ec>
 */

const server = require('../../../app.js');
const supertest = require('supertest');
const requestWithSupertest = supertest(server);
process.env.NODE_ENV = 'test';

describe('Update request Clientes', () => {
  it('TC-308 PUT /clientes/update : successful  update', async () => {
    const clientes = await requestWithSupertest.get('/clientes/all');
    const locations = await requestWithSupertest.get('/locations/all');

    const location = locations.body[locations.body.length - 1];
    const cliente = clientes.body[clientes.body.length - 1];

    const obj1 = {
      client_tel: cliente.client_tel,
      client_ID: cliente.client_ID,
      client_name: 'Mario Moreno',
      start_date: new Date(),
      location_id: location.location_id,
      address_link: 'https://adreeesr.com'
    };

    const res1 = await requestWithSupertest.put('/clientes/update').send(obj1);
    expect(res1.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res1.statusCode).toBe(201);
    expect(res1.body.client_ID).toBe(cliente.client_ID);
  });

  it('TC-309 PUT /clientes/update : wrong client_ID', async () => {
    const locations = await requestWithSupertest.get('/locations/all');
    const location = locations.body[locations.body.length - 1];

    const obj1 = {
      client_tel: '0853914964',
      client_ID: '1153918964',
      client_name: 'Juan Moreno',
      start_date: new Date(),
      location_id: location.location_id,
      address_link: 'https://adreees.com'
    };

    const res1 = await requestWithSupertest.put('/clientes/update').send(obj1);
    expect(res1.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res1.statusCode).toBe(404);
    expect(res1.body.error).toBe('No data has been update');
  });

  it('TC-310 PUT /clientes/update/auth: correct credentials and new user', async () => {
    const obj = {
      client_user: 'sgillmorb',
      client_password: 'yI6?9`*uASeB\\JLh',
      new_user: 'jellerbarri',
      new_password: 'Cy7XU6t8'
    };

    const res = await requestWithSupertest.put('/clientes/update/auth').send(obj);
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(201);
    expect(res.body.user).toBe('jellerbarri');

    const credentials = {
      client_user: obj.new_user,
      client_password: obj.new_password
    };
    const res2 = await requestWithSupertest.post('/clientes/log').send(credentials);
    expect(res2.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res2.statusCode).toBe(200);
  });

  it('TC-311 PUT /clientes/update/auth: correct credentials , but new user already  in use', async () => {
    const obj = {
      client_user: 'gwisden1',
      client_password: 'cT7?!}i}I79.R3',
      new_user: 'amoth0',
      new_password: 'r6TEzgJ98'
    };

    const res = await requestWithSupertest.put('/clientes/update/auth').send(obj);
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(409);
    expect(res.body.error).toBe('New user not valid');
  });

  it('TC-312 PUT /clientes/update/auth: wrong credentials', async () => {
    const obj1 = {
      client_user: 'lcallister7',
      client_password: '11112546aa',
      new_user: 'scolling',
      new_password: 'Cy7XU6t8'
    };

    const res1 = await requestWithSupertest.put('/clientes/update/auth').send(obj1);
    expect(res1.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res1.statusCode).toBe(409);
    expect(res1.body.error).toBe('Credentials not valid');
  });

  it('TC-313 PUT /clientes/update/auth: correct credentials and old user', async () => {
    const obj = {
      client_user: 'vhanese',
      client_password: 'rM2)3H@q8e|H&',
      new_user: 'vhanese',
      new_password: 'Cy7XU6t8'
    };

    const res = await requestWithSupertest.put('/clientes/update/auth').send(obj);
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(201);
    expect(res.body.user).toBe(obj.new_user);

    const credentials = {
      client_user: obj.client_user,
      client_password: obj.new_password
    };
    const res2 = await requestWithSupertest.post('/clientes/log').send(credentials);
    expect(res2.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res2.statusCode).toBe(200);
  });
});
