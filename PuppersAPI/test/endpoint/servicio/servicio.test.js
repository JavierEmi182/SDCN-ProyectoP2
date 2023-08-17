/* eslint-disable no-undef */
/**
 * @file Testing that Add  HTTP requests for "servicio" table
 * @author Gabriel Maldonado <gabamald@espol.edu.ec>
 */

const server = require('../../../app.js');
const supertest = require('supertest');
const requestWithSupertest = supertest(server);
process.env.NODE_ENV = 'test';

describe('Create , Update and Delete Servicios', () => {
  it('TC-901 POST /servicios/add : succesful add', async () => {
    const mascotas = await requestWithSupertest.get('/mascotas/all');
    const petToken = mascotas.body[mascotas.body.length - 1].pet_token;

    const franjas = await requestWithSupertest.get('/franjaHoraria/all');
    const franjaID = franjas.body[franjas.body.length - 6].franja_id;

    const walker = await requestWithSupertest.get('/paseadores/all');
    const walkerID = walker.body[walker.body.length - 1].walker_ID;

    const obj1 = {
      pet_token: petToken,
      franja_id: franjaID,
      walker_ID: walkerID
    };

    const res1 = await requestWithSupertest.post('/servicios/add').send(obj1);
    expect(res1.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res1.statusCode).toBe(201);
  });

  it('TC-902 POST /servicios/add : pet_token does no exist ', async () => {
    const mascotas = await requestWithSupertest.get('/mascotas/all');
    const petToken = mascotas.body[mascotas.body.length - 1].pet_token + 5;

    const franjas = await requestWithSupertest.get('/franjaHoraria/all');
    const franjaID = franjas.body[franjas.body.length - 6].franja_id;

    const walker = await requestWithSupertest.get('/paseadores/all');
    const walkerID = walker.body[walker.body.length - 2].walker_ID;

    const obj = {
      pet_token: petToken,
      franja_id: franjaID,
      walker_ID: walkerID

    };

    const res = await requestWithSupertest.post('/servicios/add').send(obj);
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(409);
    expect(res.body.error).toBe('Pet Token does not exist');
  });

  it('TC-903 POST /servicios/add : walker_ID does not exist', async () => {
    const mascotas = await requestWithSupertest.get('/mascotas/all');
    const petToken = mascotas.body[0].pet_token;

    const franjas = await requestWithSupertest.get('/franjaHoraria/all');
    const franjaID = franjas.body[franjas.body.length - 4].franja_id;

    const walker = await requestWithSupertest.get('/paseadores/all');
    const walkerID = walker.body[walker.body.length - 2].walker_ID;
    const BadID = walkerID.substring(0, walkerID.length - 3) + '598';

    const obj = {
      pet_token: petToken,
      franja_id: franjaID,
      walker_ID: BadID
    };

    const res = await requestWithSupertest.post('/servicios/add').send(obj);
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(409);
    expect(res.body.error).toBe('walker_ID does not exist');
  });

  it('TC-904 POST /servicios/add : walker_ID not valid', async () => {
    const mascotas = await requestWithSupertest.get('/mascotas/all');
    const petToken = mascotas.body[0].pet_token;

    const franjas = await requestWithSupertest.get('/franjaHoraria/all');
    const franjaID = franjas.body[franjas.body.length - 4].franja_id;

    const obj = {
      pet_token: petToken,
      franja_id: franjaID,
      walker_ID: '0000000000'

    };

    const res = await requestWithSupertest.post('/servicios/add').send(obj);
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(409);
    expect(res.body.error).toBe('walker_ID not valid');
  });

  it('TC-905 POST /servicios/add : franja_id does no exist ', async () => {
    const mascotas = await requestWithSupertest.get('/mascotas/all');
    const petToken = mascotas.body[mascotas.body.length - 1].pet_token;

    const franjas = await requestWithSupertest.get('/franjaHoraria/all');
    const franjaID = franjas.body[franjas.body.length - 6].franja_id + 8;

    const walker = await requestWithSupertest.get('/paseadores/all');
    const walkerID = walker.body[walker.body.length - 2].walker_ID;

    const obj = {
      pet_token: petToken,
      franja_id: franjaID,
      walker_ID: walkerID
    };

    const res = await requestWithSupertest.post('/servicios/add').send(obj);
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe('Unable to add');
  });

  it('TC-906 DELETE /servicios/delete/:servicio_ID : correct servicio_ID ', async () => {
    const result = await requestWithSupertest.get('/servicios/all');
    const servicioID = result.body[result.body.length - 1].servicio_ID;

    const res = await requestWithSupertest.delete('/servicios/delete/' + servicioID);
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(200);
  });

  it('TC-907 DELETE /servicios/delete/:servicio_ID : wrong servicio_ID ', async () => {
    const result = await requestWithSupertest.get('/servicios/all');
    const servicioID = result.body[result.body.length - 1].servicio_ID + 9;

    const res = await requestWithSupertest.delete('/servicios/delete/' + servicioID);
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(404);
  });

  it('TC-908 PUT /servicios/update : successful update', async () => {
    const servicios = await requestWithSupertest.get('/servicios/all');
    const servicio = servicios.body[servicios.body.length - 10];

    const servicioID = servicio.servicio_ID;
    const oldFranja = servicio.franja_id;
    const oldWalker = servicio.walker_ID;

    const franjas = (await requestWithSupertest.get('/franjaHoraria/all')).body;
    const walkers = (await requestWithSupertest.get('/paseadores/all')).body;

    let franjaID = 0;
    let walkerID = '';
    do {
      const franjaIndex = Math.floor(Math.random() * franjas.length);
      const paseadorIndex = Math.floor(Math.random() * walkers.length);

      franjaID = franjas[franjaIndex].franja_id;
      walkerID = walkers[paseadorIndex].walker_ID;
    } while (oldFranja === franjaID && walkerID.localeCompare(oldWalker) === 0);

    const obj1 = {
      servicio_ID: servicioID,
      franja_id: franjaID,
      walker_ID: walkerID
    };

    const res1 = await requestWithSupertest.put('/servicios/update').send(obj1);
    expect(res1.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res1.statusCode).toBe(201);
    expect(res1.body.servicio_ID).toBe(servicioID);
  });

  it('TC-909 PUT /servicios/update : walker_ID does not exist', async () => {
    const servicios = await requestWithSupertest.get('/servicios/all');
    const servicio = servicios.body[servicios.body.length - 14];

    const servicioID = servicio.servicio_ID;
    const oldFranja = servicio.franja_id;
    const oldWalker = servicio.walker_ID;

    const franjas = (await requestWithSupertest.get('/franjaHoraria/all')).body;
    const walkers = (await requestWithSupertest.get('/paseadores/all')).body;

    let franjaID = 0;
    let walkerID = '';
    do {
      const franjaIndex = Math.floor(Math.random() * franjas.length);
      const paseadorIndex = Math.floor(Math.random() * walkers.length);

      franjaID = franjas[franjaIndex].franja_id;
      walkerID = walkers[paseadorIndex].walker_ID;
    } while (oldFranja === franjaID && walkerID.localeCompare(oldWalker) === 0);

    const BadID = walkerID.substring(0, walkerID.length - 3) + '598';

    const obj = {
      servicio_ID: servicioID,
      franja_id: franjaID,
      walker_ID: BadID
    };

    const res = await requestWithSupertest.put('/servicios/update').send(obj);
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(409);
    expect(res.body.error).toBe('walker_ID does not exist');
  });

  it('TC-910 PUT /servicios/update : walker_ID not valid', async () => {
    const servicios = await requestWithSupertest.get('/servicios/all');
    const servicio = servicios.body[servicios.body.length - 9];

    const servicioID = servicio.servicio_ID;
    const oldFranja = servicio.franja_id;

    const franjas = (await requestWithSupertest.get('/franjaHoraria/all')).body;

    let franjaID = 0;
    do {
      const franjaIndex = Math.floor(Math.random() * franjas.length);
      franjaID = franjas[franjaIndex].franja_id;
    } while (oldFranja === franjaID);

    const obj = {
      servicio_ID: servicioID,
      franja_id: franjaID,
      walker_ID: '0000000000'
    };

    const res = await requestWithSupertest.put('/servicios/update').send(obj);
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(409);
    expect(res.body.error).toBe('walker_ID not valid');
  });

  it('TC-911 PUT /servicios/update: franja_id does no exist ', async () => {
    const servicios = await requestWithSupertest.get('/servicios/all');
    const servicio = servicios.body[servicios.body.length - 10];

    const servicioID = servicio.servicio_ID;
    const oldWalker = servicio.walker_ID;

    const franjas = (await requestWithSupertest.get('/franjaHoraria/all')).body;
    const walkers = (await requestWithSupertest.get('/paseadores/all')).body;

    let walkerID = '';
    do {
      const paseadorIndex = Math.floor(Math.random() * walkers.length);

      walkerID = walkers[paseadorIndex].walker_ID;
    } while (walkerID.localeCompare(oldWalker) === 0);

    const franjaID = franjas[franjas.length - 6].franja_id + 8;

    const obj = {
      servicio_ID: servicioID,
      franja_id: franjaID,
      walker_ID: walkerID
    };

    const res = await requestWithSupertest.put('/servicios/update').send(obj);
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe('Unable to update');
  });

  it('TC-912 PUT /servicios/update : servicio_ID does no exist', async () => {
    const servicios = await requestWithSupertest.get('/servicios/all');
    const servicio = servicios.body[servicios.body.length - 6];

    const servicioID = servicio.servicio_ID;
    const oldFranja = servicio.franja_id;
    const oldWalker = servicio.walker_ID;

    const franjas = (await requestWithSupertest.get('/franjaHoraria/all')).body;
    const walkers = (await requestWithSupertest.get('/paseadores/all')).body;

    let franjaID = 0;
    let walkerID = '';
    do {
      const franjaIndex = Math.floor(Math.random() * franjas.length);
      const paseadorIndex = Math.floor(Math.random() * walkers.length);

      franjaID = franjas[franjaIndex].franja_id;
      walkerID = walkers[paseadorIndex].walker_ID;
    } while (oldFranja === franjaID && walkerID.localeCompare(oldWalker) === 0);

    const BadService = servicioID + 8;

    const obj1 = {
      servicio_ID: BadService,
      franja_id: franjaID,
      walker_ID: walkerID
    };

    const res = await requestWithSupertest.put('/servicios/update').send(obj1);
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(404);
    expect(res.body.error).toBe('No data has been update');
  });
});
