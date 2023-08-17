/* eslint-disable no-undef */
/**
 * @file Testing that the server is Runing
 * @author Gabriel Maldonado <gabamald@espol.edu.ec>
 */

const server = require('../app.js');
const supertest = require('supertest');
const requestWithSupertest = supertest(server);

describe('TC- 00 Server Runing', () => {
  it('GET /', async () => {
    const res = await requestWithSupertest.get('/');
    expect(res.header['content-type']).toBe('text/html; charset=utf-8');
    expect(res.statusCode).toBe(200);
  });
});
