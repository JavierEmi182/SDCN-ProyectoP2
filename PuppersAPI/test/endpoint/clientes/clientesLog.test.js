/* eslint-disable no-undef */
/**
 * @file Testing  HTTP requests for log in as a user of the  "clientes" table
 * @author Gabriel Maldonado <gabamald@espol.edu.ec>
 */

const server = require('../../../app.js');
const supertest = require('supertest');
const requestWithSupertest = supertest(server);
process.env.NODE_ENV = 'test';

describe('Log in request Clientes', () => {
  it('TC-306 POST /clientes/log: Correct credentials', async () => {
    const obj = {
      client_user: 'gwisden1',
      client_password: 'cT7?!}i}I79.R3'
    };
    const res = await requestWithSupertest.post('/clientes/log').send(obj);

    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(200);
    expect(res.body.client_ID).toBe('8393730756');
  });

  it('TC-307 POST /clientes/log: Wrong credentials', async () => {
    const obj1 = {
      client_user: 'gwisden1',
      client_password: '5845rt15'
    };
    const res1 = await requestWithSupertest.post('/clientes/log').send(obj1);
    expect(res1.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res1.statusCode).toBe(404);
    expect(res1.body.error).toBe('Data not valid');

    const obj2 = {
      client_user: 'mcuolahan0',
      client_password: 'ass78$412'
    };
    const res2 = await requestWithSupertest.post('/clientes/log').send(obj2);
    expect(res2.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res2.statusCode).toBe(404);
    expect(res2.body.error).toBe('Data not valid');
  });
});
