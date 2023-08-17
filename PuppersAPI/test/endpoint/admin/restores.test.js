/* eslint-disable no-undef */
/**
 * @file Testing  HTTP requests to restore password to default one
 * @author Gabriel Maldonado <gabamald@espol.edu.ec>
 */

const server = require('../../../app.js');
const supertest = require('supertest');
const requestWithSupertest = supertest(server);
process.env.NODE_ENV = 'test';

describe('Create , Update , Delete Admin', () => {
  it('TC-110 PUT /admin/restore/cliente: correct restoration', async () => {
    const result = await requestWithSupertest.get('/clientes/all');
    const client = result.body[result.body.length - 4];

    const obj = {
      client_ID: client.client_ID
    };
    const res = await requestWithSupertest.put('/admin/restore/cliente').send(obj);
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(201);

    const credentials = {
      client_user: client.client_user,
      client_password: obj.client_ID
    };
    const res2 = await requestWithSupertest.post('/clientes/log').send(credentials);
    expect(res2.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res2.statusCode).toBe(200);
  });

  it('TC-111 PUT /admin/restore/cliente: Wrong client_ID', async () => {
    const obj = {
      client_ID: '0089653019'
    };
    const res = await requestWithSupertest.put('/admin/restore/cliente').send(obj);
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(404);
    expect(res.body.error).toBe('No data has been update');
  });

  it('TC-112 PUT /admin/restore/paseador: correct restoration', async () => {
    const result = await requestWithSupertest.get('/paseadores/all');
    const paseador = result.body[result.body.length - 1];

    const obj = {
      walker_ID: paseador.walker_ID
    };
    const res = await requestWithSupertest.put('/admin/restore/paseador').send(obj);
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(201);

    const credentials = {
      walker_user: paseador.walker_user,
      walker_password: obj.walker_ID
    };
    const res2 = await requestWithSupertest.post('/paseadores/log').send(credentials);
    expect(res2.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res2.statusCode).toBe(200);
  });

  it('TC-113 PUT /admin/restore/paseador: Wrong walker_ID', async () => {
    const obj = {
      walker_ID: '0089653019'
    };
    const res = await requestWithSupertest.put('/admin/restore/paseador').send(obj);
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(404);
    expect(res.body.error).toBe('No data has been update');
  });
});
