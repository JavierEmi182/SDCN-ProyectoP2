/* eslint-disable no-undef */
/**
 * @file Testing that Read , Update and Delete HTTP requests for "admin" table
 * @author Gabriel Maldonado <gabamald@espol.edu.ec>
 */

const server = require('../../../app.js');
const supertest = require('supertest');
process.env.NODE_ENV = 'test';

const requestWithSupertest = supertest(server);

describe('Create , Update , Delete Admin', () => {
  it('TC-101 POST /admin/add: new user ', async () => {
    const obj1 = {
      admin_username: 'testUser4',
      admin_password: 'h87m9pow8R+)'
    };

    const res1 = await requestWithSupertest.post('/admin/add').send(obj1);
    expect(res1.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res1.statusCode).toBe(201);
  });

  it('TC-102 POST /admin/add:  already existing admin_username', async () => {
    const obj1 = {
      admin_username: 'testUser1',
      admin_password: 'h8mm9_@w8R+'
    };

    const res1 = await requestWithSupertest.post('/admin/add').send(obj1);
    expect(res1.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res1.statusCode).toBe(409);
    expect(res1.body.error).toBe('User not valid');

    const obj2 = {
      admin_username: 'testUser2',
      admin_password: 'YCzkgUv[;,2Y'
    };

    const res2 = await requestWithSupertest.post('/admin/add').send(obj2);
    expect(res2.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res2.statusCode).toBe(409);
    expect(res2.body.error).toBe('User not valid');
  });

  it('TC-103 POST /admin/log: correct credentials', async () => {
    const obj = {
      admin_username: 'testUser1',
      admin_password: 'h8mm9_@w8R+)'
    };
    const res = await requestWithSupertest.post('/admin/log').send(obj);

    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(200);
  });

  it('TC-104 POST /admin/log: Wrong credentials ', async () => {
    const obj1 = {
      admin_username: 'testUser25',
      admin_password: '654842RT'
    };
    const res1 = await requestWithSupertest.post('/admin/log').send(obj1);

    expect(res1.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res1.statusCode).toBe(404);
    expect(res1.body.error).toBe('Data not valid');

    const obj2 = {
      admin_username: 'testUser1',
      admin_password: '654842RT'
    };
    const res2 = await requestWithSupertest.post('/admin/log').send(obj2);

    expect(res2.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res2.statusCode).toBe(404);
    expect(res1.body.error).toBe('Data not valid');
  });

  it('TC-105 PUT /admin/update/auth: correct credentials and new user ', async () => {
    const obj = {
      admin_username: 'testUser2',
      admin_password: 'YCzkgUv[;,2Y',
      new_user: 'NewTest',
      new_password: 'Cy7XU6t8'
    };

    const res = await requestWithSupertest.put('/admin/update/auth').send(obj);
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(201);
    expect(res.body.user).toBe(obj.new_user);

    const credentials = {
      admin_username: obj.new_user,
      admin_password: obj.new_password
    };
    const res2 = await requestWithSupertest.post('/admin/log').send(credentials);
    expect(res2.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res2.statusCode).toBe(200);
  });

  it('TC-110 PUT /admin/update/auth: correct credentials and old user ', async () => {
    const obj = {
      admin_username: 'testUser9',
      admin_password: 'A158Kyetr',
      new_user: 'testUser9',
      new_password: 'Cy7XU6t8'
    };

    const res = await requestWithSupertest.put('/admin/update/auth').send(obj);
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(201);
    expect(res.body.user).toBe(obj.new_user);

    const credentials = {
      admin_username: obj.admin_username,
      admin_password: obj.new_password
    };
    const res2 = await requestWithSupertest.post('/admin/log').send(credentials);
    expect(res2.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res2.statusCode).toBe(200);
  });

  it('TC-106 PUT /admin/update/auth: correct credentials and new user alredy in use', async () => {
    const obj = {
      admin_username: 'testUser1',
      admin_password: 'h8mm9_@w8R+)',
      new_user: 'testUser3',
      new_password: 'r6TEzgJ89'
    };

    const res = await requestWithSupertest.put('/admin/update/auth').send(obj);
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(409);
    expect(res.body.error).toBe('New user not valid');
  });

  it('TC-107 PUT /admin/update/auth: wrong credentials', async () => {
    const obj1 = {
      admin_username: 'testUser3',
      admin_password: '11112546aa',
      new_user: 'scolling',
      new_password: 'Cy7XU6t8'
    };

    const res1 = await requestWithSupertest.put('/admin/update/auth').send(obj1);
    expect(res1.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res1.statusCode).toBe(409);
    expect(res1.body.error).toBe('Credentials not valid');

    const obj2 = {
      admin_username: 'mtoshg',
      admin_password: '11112546aa',
      new_user: 'scolling',
      new_password: 'Cy7XU6t8'
    };

    const res2 = await requestWithSupertest.put('/admin/update/auth').send(obj2);
    expect(res2.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res2.statusCode).toBe(409);
    expect(res2.body.error).toBe('Credentials not valid');
  });

  it('TC-108 DELETE /admin/delete/:admin_username : correct admin_username', async () => {
    const result = await requestWithSupertest.get('/admin/all');
    const id = result.body[result.body.length - 1].admin_username;

    const res = await requestWithSupertest.delete('/admin/delete/' + id);
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(200);
  });

  it('TC-109 DELETE /admin/delete/:admin_username : wrong admin_username', async () => {
    const result = await requestWithSupertest.get('/admin/all');
    const id = 'xd' + result.body[result.body.length - 1].admin_username;

    const res = await requestWithSupertest.delete('/admin/delete/' + id);
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(404);
  });
});
