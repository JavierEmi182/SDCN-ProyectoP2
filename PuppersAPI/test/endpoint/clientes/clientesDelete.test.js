/* eslint-disable no-undef */
/**
 * @file Testing Delete HTTP requests for "clientes" table
 * @author Gabriel Maldonado <gabamald@espol.edu.ec>
 */

const server = require('../../../app.js');
const supertest = require('supertest');
const requestWithSupertest = supertest(server);
process.env.NODE_ENV = 'test';

describe('Delete request Clientes', () => {
  it('TC-304 DELETE /clientes/delete/:client_ID : correct client_ID', async () => {
    const result = await requestWithSupertest.get('/clientes/all');
    const clientTel1 = result.body[result.body.length - 1].client_ID;
    const clientTel2 = result.body[result.body.length - 2].client_ID;

    const res1 = await requestWithSupertest.delete('/clientes/delete/' + clientTel1);
    expect(res1.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res1.statusCode).toBe(200);

    const res2 = await requestWithSupertest.delete('/clientes/delete/' + clientTel2);
    expect(res2.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res2.statusCode).toBe(200);
  });

  it('TC-305 DELETE /clientes/delete/:client_ID : wrong client_ID', async () => {
    const result = await requestWithSupertest.get('/clientes/all');
    const clientTel = '8' + result.body[result.body.length - 1].client_ID.substring(0, 9);

    const res = await requestWithSupertest.delete('/clientes/delete/' + clientTel);
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(404);
  });
});
