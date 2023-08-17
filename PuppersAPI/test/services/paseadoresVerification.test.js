/* eslint-disable no-undef */
/**
 * @file Testing user and password verification of paseadores
 * @author Gabriel Maldonado <gabamald@espol.edu.ec>
 */

const paseadoresVerification = require('../../services/Verification/paseadoresVerification');
const server = require('../../app.js');
const supertest = require('supertest');
const requestWithSupertest = supertest(server);

describe('Testing paseadoresVerification functions', () => {
  it('TC-15 checkCredentials paseador: all correct', async () => {
    const res = await paseadoresVerification.checkCredentials('bsams1', 'qN6?&(fcf8*pq');
    expect(res).toBe(true);
  });

  it('TC-16 checkCredentials paseador: password incorrect', async () => {
    const res = await paseadoresVerification.checkCredentials('bsams1', '14521451');
    expect(res).toBe(false);
  });

  it('TC-17 checkCredentials paseador: user incorrect', async () => {
    const res = await paseadoresVerification.checkCredentials('mario25', 'qN6?&(fcf8*pq');
    expect(res).toBe(false);
  });

  it('TC-18 checkCredentials paseador: empty parameters', async () => {
    const res = await paseadoresVerification.checkCredentials('', '');
    expect(res).toBe(false);
  });

  it('TC-19 checkUser paseador: user correct', async () => {
    const res = await paseadoresVerification.checkUser('bsams1');
    expect(res).toBe(true);
  });

  it('TC-20 checkUser paseador: user incorrect', async () => {
    const res = await paseadoresVerification.checkUser('aa123bsnl');
    expect(res).toBe(false);
  });

  it('TC-21 checkUser paseador: empty parameters', async () => {
    const res = await paseadoresVerification.checkUser('');
    expect(res).toBe(false);
  });

  it('TC-22 checkID walker_ID: pet_token correct', async () => {
    const walker = await requestWithSupertest.get('/paseadores/all');
    const walkerID = walker.body[walker.body.length - 2].walker_ID;

    const res = await paseadoresVerification.checkID(walkerID);
    expect(res).toBe(true);
  });

  it('TC-23 checkID walker_ID: walker_ID incorrect', async () => {
    const walker = await requestWithSupertest.get('/paseadores/all');
    const walkerID = walker.body[walker.body.length - 2].walker_ID;
    const BadID = walkerID.substring(0, walkerID.length - 3) + '598';

    const res = await paseadoresVerification.checkID(BadID);
    expect(res).toBe(false);
  });
});
