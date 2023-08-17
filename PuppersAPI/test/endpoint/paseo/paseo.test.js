/* eslint-disable no-undef */
/**
 * @file Testing  Create  HTTP requests for "paseadores" table
 * @author Gabriel Maldonado <gabamald@espol.edu.ec>
 */

const server = require('../../../app.js');
const supertest = require('supertest');
const requestWithSupertest = supertest(server);
process.env.NODE_ENV = 'test';

describe('Start and end request for Paseo', () => {
  it('TC-801 POST /paseos/start : succesful start', async () => {
    const servicios = await requestWithSupertest.get('/servicios/all');
    const servicio = servicios.body[servicios.body.length - 1];

    const obj1 = {
      walker_ID: servicio.walker_ID,
      servicio_ID: servicio.servicio_ID
    };

    const res1 = await requestWithSupertest.post('/paseos/start').send(obj1);
    expect(res1.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res1.statusCode).toBe(201);
  });

  it('TC-802 POST /paseos/start : wrong ids for start ', async () => {
    const servicios = await requestWithSupertest.get('/servicios/all');
    const servicio = servicios.body[servicios.body.length - 1];

    const obj1 = {
      walker_ID: servicio.walker_ID,
      servicio_ID: servicio.servicio_ID + 5
    };

    const res1 = await requestWithSupertest.post('/paseos/start').send(obj1);
    expect(res1.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res1.statusCode).toBe(400);
  });

  it('TC-803 PUT /paseos/end : successful  end', async () => {
    const paseos = await requestWithSupertest.get('/paseos/all');
    const paseo = paseos.body[paseos.body.length - 5];

    const obj1 = {
      paseo_ID: paseo.paseo_ID,
      evidenceURL: 'https://loc.com/898/89/img456'
    };

    const res1 = await requestWithSupertest.put('/paseos/end').send(obj1);
    expect(res1.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res1.statusCode).toBe(201);
  });

  it('TC-804 PUT /paseos/end : wrong paseo_ID for end', async () => {
    const paseos = await requestWithSupertest.get('/paseos/all');
    const paseo = paseos.body[paseos.body.length - 1];

    const obj1 = {
      paseo_ID: paseo.paseo_ID + 5,
      evidenceURL: 'https://loc.com/898/89/img45896'
    };

    const res1 = await requestWithSupertest.put('/paseos/end').send(obj1);
    expect(res1.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res1.statusCode).toBe(404);
    expect(res1.body.error).toBe('Any paseo has not been ended');
  });

  it('TC-805 PUT /paseos/end : paseo already ended for end', async () => {
    const servicios = await requestWithSupertest.get('/servicios/all');
    const servicio = servicios.body[servicios.body.length - 9];

    const obj1 = {
      walker_ID: servicio.walker_ID,
      servicio_ID: servicio.servicio_ID
    };

    const res1 = await requestWithSupertest.post('/paseos/start').send(obj1);
    expect(res1.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res1.statusCode).toBe(201);

    const paseoID = res1.body.paseo_ID;

    const obj2 = {
      paseo_ID: paseoID,
      evidenceURL: 'https://loc.com/898/89/img4589689'
    };

    const res2 = await requestWithSupertest.put('/paseos/end').send(obj2);
    expect(res2.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res2.statusCode).toBe(201);

    const res3 = await requestWithSupertest.put('/paseos/end').send(obj2);
    expect(res3.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res3.statusCode).toBe(404);
    expect(res3.body.error).toBe('Any paseo has not been ended');
  });
});
