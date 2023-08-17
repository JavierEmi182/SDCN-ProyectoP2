/* eslint-disable no-undef */
/**
 * @file Testing pet_token verification of mascotas
 * @author Gabriel Maldonado <gabamald@espol.edu.ec>
 */

const mascotaVerification = require('../../services/Verification/mascotaVerification.js');
const server = require('../../app.js');
const supertest = require('supertest');
const requestWithSupertest = supertest(server);

describe('Testing mascotaVerification functions', () => {
  it('TC-24 checkID pet_token: pet_token correct', async () => {
    const mascotas = await requestWithSupertest.get('/mascotas/all');
    const petToken = mascotas.body[mascotas.body.length - 1].pet_token;

    const res = await mascotaVerification.checkID(petToken);
    expect(res).toBe(true);
  });

  it('TC-25 checkID pet_token: pet_token incorrect', async () => {
    const mascotas = await requestWithSupertest.get('/mascotas/all');
    const petToken = mascotas.body[mascotas.body.length - 1].pet_token + 5;
    const res = await mascotaVerification.checkID(petToken);
    expect(res).toBe(false);
  });

  it('TC-26 checkID pet_token: 0 pet_token', async () => {
    const res = await mascotaVerification.checkID(0);
    expect(res).toBe(false);
  });
});
