/* eslint-disable no-undef */
/**
 * @file Testing that Add , Update and Delete HTTP requests for "mascotas" table
 * @author Gabriel Maldonado <gabamald@espol.edu.ec>
 */

const server = require('../../../app.js');
const supertest = require('supertest');
const requestWithSupertest = supertest(server);
process.env.NODE_ENV = 'test';

const realClientID = ['1690302889', '8393730756', '5993708626', '5484169119'];
const fakeClientID = ['4709243749'];

describe('Create , Update , Delete Mascotas', () => {
  it('TC-601 POST /mascotas/add : successful  add', async () => {
    const obj1 = {
      client_ID: realClientID[0],
      pet_name: 'Mochito',
      pet_breed: 'Runa',
      service: '3P',
      renovation_date: '2023-2-25'
    };

    const res1 = await requestWithSupertest.post('/mascotas/add').send(obj1);
    expect(res1.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res1.statusCode).toBe(201);

    const obj2 = {
      client_ID: realClientID[1],
      pet_name: 'Pipo',
      pet_breed: 'Pekines',
      service: '5P',
      renovation_date: '2023-06-13'
    };

    const res2 = await requestWithSupertest.post('/mascotas/add').send(obj2);
    expect(res2.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res2.statusCode).toBe(201);
  });

  it('TC-602 POST /mascotas/add : client_ID does no exist ', async () => {
    const obj = {
      client_ID: fakeClientID[0],
      pet_name: 'Mochito',
      pet_breed: 'Runa',
      service: '3P',
      renovation_date: '2023-4-25'
    };

    const res = await requestWithSupertest.post('/mascotas/add').send(obj);
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe('Unable to add');
  });

  it('TC-603 PUT /mascotas/update : correct pet_token', async () => {
    const result = await requestWithSupertest.get('/mascotas/all');
    const petToken = result.body[result.body.length - 1].pet_token;

    const obj = {
      pet_token: petToken,
      client_ID: realClientID[2],
      pet_name: 'Mochita',
      pet_breed: 'Runa',
      service: '3P',
      renovation_date: '2023-6-14'
    };

    const res = await requestWithSupertest.put('/mascotas/update').send(obj);

    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(201);
    expect(res.body.pet_token).toBe(petToken);
  });

  it('TC-604 PUT /mascotas/update : wrong pet_token', async () => {
    const result = await requestWithSupertest.get('/mascotas/all');
    const petToken = result.body[result.body.length - 1].pet_token + 8;

    const obj = {
      pet_token: petToken,
      client_ID: realClientID[3],
      pet_name: 'Moro',
      pet_breed: 'Runa',
      service: '5P',
      renovation_date: '2023-4-01'
    };

    const res = await requestWithSupertest.put('/mascotas/update').send(obj);
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(404);
    expect(res.body.error).toBe('No data has been update');
  });

  it('TC-605 PUT /mascotas/update : client_ID does no exist', async () => {
    const result = await requestWithSupertest.get('/mascotas/all');
    const petToken = result.body[result.body.length - 5].pet_token + 8;

    const obj = {
      pet_token: petToken,
      client_ID: fakeClientID[0],
      pet_name: 'Marine',
      pet_breed: 'Runa',
      service: '5P',
      renovation_date: '2023-2-25'
    };

    const res = await requestWithSupertest.put('/mascotas/update').send(obj);
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(404);
    expect(res.body.error).toBe('No data has been update');
  });

  it('TC-606 DELETE /mascotas/delete/:pet_token : correct pet_token', async () => {
    const result = await requestWithSupertest.get('/mascotas/all');
    const petToken = result.body[result.body.length - 15].pet_token;

    const res = await requestWithSupertest.delete('/mascotas/delete/' + petToken);
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(200);
  });

  it('TC-607 DELETE /mascotas/delete/:pet_token : wrong pet_token', async () => {
    const result = await requestWithSupertest.get('/mascotas/all');
    const petToken = result.body[result.body.length - 2].pet_token + 7;

    const res = await requestWithSupertest.delete('/mascotas/delete/' + petToken);
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(404);
  });
});
