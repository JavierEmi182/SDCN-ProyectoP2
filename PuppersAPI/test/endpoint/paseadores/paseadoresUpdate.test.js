/* eslint-disable no-undef */
/**
 * @file Testing Update  HTTP requests for "paseadores" table
 * @author Gabriel Maldonado <gabamald@espol.edu.ec>
 */

const server = require('../../../app.js');
const supertest = require('supertest');
const requestWithSupertest = supertest(server);
process.env.NODE_ENV = 'test';

describe('Update request Paseadores', () => {
  it('TC-708 PUT /paseadores/update : successful  update', async () => {
    const result = await requestWithSupertest.get('/paseadores/all');
    const walkerID1 = result.body[result.body.length - 1].walker_ID;

    const obj1 = {
      walker_ID: walkerID1,
      walker_tel: '0987654420',
      walker_name: 'Kayley',
      start_date: new Date(),
      walker_address: 'Calle 38 y Av. 98',
      walker_linkaddress: 'https://adreeeser.com',
      walker_photoURL: 'https://yt3.ggpht.com/_HfKs9j_WJsQ8eQdnrGAbJtuT-1HaWsKZqCByx1JkNxEOcvMpf0bFOEwnKDhLWal5LomYGMD1A=s88-c-k-c0x00ffffff-no-rj',
      walker_bloodtype: 'AB+'
    };

    const res1 = await requestWithSupertest.put('/paseadores/update').send(obj1);
    expect(res1.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res1.statusCode).toBe(201);
    expect(res1.body.walker_ID).toBe(walkerID1);
  });

  it('TC-709 PUT /paseadores/update : wrong walker_ID', async () => {
    const obj1 = {
      walker_ID: '1423698526',
      walker_tel: '0987654420',
      walker_name: 'Kayley',
      start_date: new Date(),
      walker_address: 'Calle Parana y Av. Guaripolo',
      walker_linkaddress: 'https://adrr.com',
      walker_photoURL: 'https://scontent.fgye30-1.fna.fbcdn.net/v/t1.18169-9/14938174_335785943450881_7046700467054324134_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=9267fe&_nc_ohc=ewncY2VmrnQAX-jpkyj&_nc_ht=scontent.fgye30-1.fna&oh=00_AfDS_MmG8FVfdrYWyfRGBqupyZPKDwQzTo0a_-l5p4DYiQ&oe=64D6C663',
      walker_bloodtype: 'AB-'
    };

    const res1 = await requestWithSupertest.put('/paseadores/update').send(obj1);
    expect(res1.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res1.statusCode).toBe(404);
    expect(res1.body.error).toBe('No data has been update');

    const obj2 = {
      walker_ID: '8532156690',
      walker_tel: '0987541420',
      walker_name: 'Mario',
      start_date: new Date(),
      walker_address: 'Calle Parana y Av. Guaripolo',
      walker_linkaddress: 'https://adrr.com',
      walker_photoURL: 'https://scontent.fgye30-1.fna.fbcdn.net/v/t1.18169-9/14938174_335785943450881_7046700467054324134_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=9267fe&_nc_ohc=ewncY2VmrnQAX-jpkyj&_nc_ht=scontent.fgye30-1.fna&oh=00_AfDS_MmG8FVfdrYWyfRGBqupyZPKDwQzTo0a_-l5p4DYiQ&oe=64D6C663',
      walker_bloodtype: 'AB-'
    };

    const res2 = await requestWithSupertest.put('/paseadores/update').send(obj2);
    expect(res2.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res2.statusCode).toBe(404);
    expect(res2.body.error).toBe('No data has been update');
  });

  it('TC-710 PUT /paseadores/update/auth : correct credentials and new user', async () => {
    const obj = {
      walker_user: 'kocurrine9',
      walker_password: 'fP1&W3t+`xyzC',
      new_user: 'jdey878',
      new_password: 'Cy7X8958'
    };

    const res = await requestWithSupertest.put('/paseadores/update/auth').send(obj);
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(201);
    expect(res.body.user).toBe(obj.new_user);

    const credentials = {
      walker_user: obj.new_user,
      walker_password: obj.new_password
    };
    const res2 = await requestWithSupertest.post('/paseadores/log').send(credentials);
    expect(res2.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res2.statusCode).toBe(200);
  });

  it('TC-711 PUT /paseadores/update/auth: correct credentials , but new user already  in use', async () => {
    const obj = {
      walker_user: 'nriccardini7',
      walker_password: 'sI9/OAP)N5',
      new_user: 'doroan0',
      new_password: 'hJIwQl89'
    };

    const res = await requestWithSupertest.put('/paseadores/update/auth').send(obj);
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(409);
    expect(res.body.error).toBe('New user not valid');
  });

  it('TC-712 PUT /paseadores/update/auth : wrong credential', async () => {
    const obj1 = {
      walker_user: 'bjedrzejewicz8',
      walker_password: '8975421or',
      new_user: 'abiggl',
      new_password: '45xxttre'
    };

    const res1 = await requestWithSupertest.put('/paseadores/update/auth').send(obj1);
    expect(res1.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res1.statusCode).toBe(409);
    expect(res1.body.error).toBe('Credentials not valid');

    const obj2 = {
      walker_user: 'bjedrcejewicz9',
      walker_password: '87fteeda',
      new_user: 'abiggl',
      new_password: '45xxttre'
    };

    const res2 = await requestWithSupertest.put('/paseadores/update/auth').send(obj2);
    expect(res2.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res2.statusCode).toBe(409);
    expect(res1.body.error).toBe('Credentials not valid');
  });

  it('TC-713 PUT /paseadores/update/auth : correct credentials and old user', async () => {
    const obj = {
      walker_user: 'hcroncheyb',
      walker_password: 'zI3$cnW_yq',
      new_user: 'hcroncheyb',
      new_password: 'TGSC580_90'
    };

    const res = await requestWithSupertest.put('/paseadores/update/auth').send(obj);
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(201);
    expect(res.body.user).toBe(obj.new_user);

    const credentials = {
      walker_user: obj.walker_user,
      walker_password: obj.new_password
    };
    const res2 = await requestWithSupertest.post('/paseadores/log').send(credentials);
    expect(res2.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res2.statusCode).toBe(200);
  });
});
