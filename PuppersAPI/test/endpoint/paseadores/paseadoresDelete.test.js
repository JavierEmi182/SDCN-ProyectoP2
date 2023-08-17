/* eslint-disable no-undef */
/**
 * @file Testing Delete HTTP requests for "paseadores" table
 * @author Gabriel Maldonado <gabamald@espol.edu.ec>
 */

const server = require('../../../app.js');
const supertest = require('supertest');
const requestWithSupertest = supertest(server);
process.env.NODE_ENV = 'test';

describe('Delete request Paseadores', () => {
  it('TC-704 DELETE /paseadores/delete/:walker_ID : correct walker_ID ', async () => {
    const result = await requestWithSupertest.get('/paseadores/all');
    const walkerID1 = result.body[result.body.length - 1].walker_ID;
    const walkerID2 = result.body[result.body.length - 2].walker_ID;

    const res1 = await requestWithSupertest.delete('/paseadores/delete/' + walkerID1);
    expect(res1.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res1.statusCode).toBe(200);

    const res2 = await requestWithSupertest.delete('/paseadores/delete/' + walkerID2);
    expect(res2.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res2.statusCode).toBe(200);
  });

  it('TC-705 DELETE /paseadores/delete/:walker_ID : wrong  walker_ID', async () => {
    const result = await requestWithSupertest.get('/paseadores/all');
    const walkerID = result.body[result.body.length - 1].walker_ID;
    const BadID = walkerID.substring(0, walkerID.length - 3) + '598';

    const res = await requestWithSupertest.delete('/paseadores/delete/' + BadID);
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(404);
  });
});
