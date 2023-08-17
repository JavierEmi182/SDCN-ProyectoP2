/* eslint-disable no-undef */
/**
 * @file Testing  Create  HTTP requests for "paseadores" table
 * @author Gabriel Maldonado <gabamald@espol.edu.ec>
 */

const server = require('../../../app.js');
const supertest = require('supertest');
const requestWithSupertest = supertest(server);
process.env.NODE_ENV = 'test';

describe('Create request Paseadores', () => {
  it('TC-701 POST /paseadores/add : new paseador', async () => {
    const obj1 = {
      walker_ID: '1755698315',
      walker_tel: '0987654300',
      walker_name: 'Juan Mario',
      start_date: new Date(),
      walker_user: 'user254',
      walker_password: '5421548re',
      walker_address: 'Calle 28 y Av. 25',
      walker_linkaddress: 'https://adreees.com',
      walker_photoURL: 'https://avatars.githubusercontent.com/u/1487036?s=80&u=867b6f2e643f190d872c249afd3cecb7c3040b34&v=4',
      walker_bloodtype: 'A+'
    };

    const res1 = await requestWithSupertest.post('/paseadores/add').send(obj1);
    expect(res1.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res1.statusCode).toBe(201);
    expect(res1.body.walker_ID).toBe('1755698315');
  });

  it('TC-702 POST /paseadores/add : walker_ID already in use', async () => {
    const obj1 = {
      walker_ID: '3139584648',
      walker_tel: '0987654300',
      walker_name: 'Diego Mario',
      start_date: new Date(),
      walker_user: 'used874',
      walker_password: 'oplpd7854',
      walker_address: 'Calle 89 y Av. 36',
      walker_linkaddress: 'https://adreees2.com',
      walker_photoURL: 'https://avatars.githubusercontent.com/u/56631?s=80&u=e53e16a9474a6852a696d6bba11943f7a35d9b1a&v=4',
      walker_bloodtype: 'B+'
    };

    const res1 = await requestWithSupertest.post('/paseadores/add').send(obj1);
    expect(res1.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res1.statusCode).toBe(400);
    expect(res1.body.error).toBe('Unable to add');
  });

  it('TC-703 POST /paseadores/add: walker_user already in use', async () => {
    const obj1 = {
      walker_ID: '1866647787',
      walker_tel: '0988854300',
      walker_name: 'Dio Mario',
      start_date: new Date(),
      walker_user: 'jtomasello2',
      walker_password: 'ultim648u',
      walker_address: 'Calle Bodoque y Av. Mrio Hugo',
      walker_linkaddress: 'https://adreees2.com',
      walker_photoURL: 'https://avatars.githubusercontent.com/u/1148376?s=80&u=97348b862d4820275f7e7567ad64a72edfec1443&v=4',
      walker_bloodtype: 'O+'
    };

    const res1 = await requestWithSupertest.post('/paseadores/add').send(obj1);
    expect(res1.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res1.statusCode).toBe(409);
    expect(res1.body.error).toBe('User not valid');
  });
});
