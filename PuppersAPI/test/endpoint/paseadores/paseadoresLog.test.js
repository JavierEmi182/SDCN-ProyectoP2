/* eslint-disable no-undef */
/**
 * @file Testing  HTTP requests for log in as a user of the "paseadores" table
 * @author Gabriel Maldonado <gabamald@espol.edu.ec>
 */

const server = require('../../../app.js');
const supertest = require('supertest');
const requestWithSupertest = supertest(server);
process.env.NODE_ENV = 'test';

describe('Log in request Paseadores', () => {
  it('RC-706 POST /paseadores/log: Correct credentials', async () => {
    const obj = {
      walker_user: 'sleece4',
      walker_password: 'rF0{Rwi!'
    };

    const res = await requestWithSupertest.post('/paseadores/log').send(obj);
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(200);
    expect(res.body.walker_ID).toBe('1936832153');
  });

  it('TC-707 POST /paseadores/log: Wrong credentials', async () => {
    const obj1 = {
      walker_user: 'mer7854',
      walker_password: '5664875re'
    };
    const res1 = await requestWithSupertest.post('/paseadores/log').send(obj1);
    expect(res1.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res1.statusCode).toBe(404);
    expect(res1.body.error).toBe('Data not valid');

    const obj2 = {
      walker_user: 'sleece4',
      walker_password: 'hRkvK8dF4'
    };
    const res2 = await requestWithSupertest.post('/paseadores/log').send(obj2);
    expect(res2.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res2.statusCode).toBe(404);
    expect(res2.body.error).toBe('Data not valid');
  });
});
