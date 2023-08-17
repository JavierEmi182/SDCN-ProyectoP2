/* eslint-disable no-undef */
/**
 * @file Testing the tokenVerified middlewares
 * @author Gabriel Maldonado <gabamald@espol.edu.ec>
 */

const server = require('../../app');
const supertest = require('supertest');
const requestWithSupertest = supertest(server);
const jwt = require('jsonwebtoken');
process.env.NODE_ENV = 'development';

const httpMocks = require('node-mocks-http');

const tokenVerified = require('../../middlewares/tokenVerified.js');
const clearenceType = require('../../services/clearenceType.js').clearenceType;

describe('Testing tokenVerified middlewares', () => {
  let mockReq;
  let mockRes;
  let nextFunction;

  beforeEach(() => {
    mockReq = httpMocks.createRequest();
    mockRes = httpMocks.createResponse();
    nextFunction = jest.fn();
  });

  it('TC-51: authChecker check no toke in send', async () => {
    const middleware = tokenVerified.authChecker();
    middleware(mockReq, mockRes, nextFunction);
    expect(mockRes.locals.authType).toBe(clearenceType.ANYONE);
  });

  it('TC-52: authChecker check token is from ADMIN', async () => {
    const obj = {
      admin_username: 'testUser1',
      admin_password: 'h8mm9_@w8R+)'
    };

    const res = await requestWithSupertest.post('/admin/log').send(obj);

    mockReq.headers = { auth: res.body.token };

    const middleware = tokenVerified.authChecker();
    middleware(mockReq, mockRes, nextFunction);
    expect(mockRes.locals.authType).toBe(clearenceType.ADMIN);
  });

  it('TC-53: authChecker check token is from CLIENTE', async () => {
    const obj = {
      client_user: 'gwisden1',
      client_password: 'cT7?!}i}I79.R3'
    };
    const res = await requestWithSupertest.post('/clientes/log').send(obj);

    mockReq.headers = { auth: res.body.token };

    const middleware = tokenVerified.authChecker();
    middleware(mockReq, mockRes, nextFunction);
    expect(mockRes.locals.authType).toBe(clearenceType.CLIENTE);
  });

  it('TC-54: authChecker check token is from PASEADOR', async () => {
    const obj = {
      walker_user: 'sleece4',
      walker_password: 'rF0{Rwi!'
    };

    const res = await requestWithSupertest.post('/paseadores/log').send(obj);
    mockReq.headers = { auth: res.body.token };

    const middleware = tokenVerified.authChecker();
    middleware(mockReq, mockRes, nextFunction);
    expect(mockRes.locals.authType).toBe(clearenceType.PASEADOR);
  });

  it('TC-55: authChecker check token with wrong type', async () => {
    const token = jwt.sign({
      user: 'sleece4',
      type: 'DoesNotExist'
    },
    process.env.TOKEN_JSTVER, { expiresIn: '1h' }
    );

    mockReq.headers = { auth: token };

    const middleware = tokenVerified.authChecker();
    middleware(mockReq, mockRes, nextFunction);
    expect(mockRes.statusCode).toBe(401);
  });

  it('TC-56: authChecker check token is not form the API', async () => {
    const token = jwt.sign({
      user: 'sleece4',
      type: clearenceType.PASEADOR
    },
    'AAA875478547854877', { expiresIn: '1h' }
    );

    mockReq.headers = { auth: token };

    const middleware = tokenVerified.authChecker();
    middleware(mockReq, mockRes, nextFunction);
    expect(mockRes.statusCode).toBe(401);
  });

  it('TC-57: authGranter check that there was no TOKEN', async () => {
    mockRes.locals = { authType: clearenceType.ANYONE };

    const middleware = tokenVerified.authGranter([clearenceType.PASEADOR]);
    middleware(mockReq, mockRes, nextFunction);
    expect(mockRes.statusCode).toBe(401);
  });

  it('TC-58: authGranter check locals.authType is not in the list ', async () => {
    mockRes.locals = { authType: clearenceType.ADMIN };
    const middleware = tokenVerified.authGranter([clearenceType.PASEADOR, clearenceType.CLIENTE]);
    middleware(mockReq, mockRes, nextFunction);
    expect(mockRes.statusCode).toBe(403);

    mockRes.locals = { authType: clearenceType.CLIENTE };
    const middleware2 = tokenVerified.authGranter([clearenceType.ADMIN, clearenceType.CLIENTE]);
    middleware2(mockReq, mockRes, nextFunction);
    expect(mockRes.statusCode).toBe(403);

    mockRes.locals = { authType: clearenceType.PASEADOR };
    const middleware3 = tokenVerified.authGranter([clearenceType.ADMIN]);
    middleware3(mockReq, mockRes, nextFunction);
    expect(mockRes.statusCode).toBe(403);
  });

  it('TC-59: authGranter check that check locals.authType == PASEADOR can been granted auth', async () => {
    mockRes.locals = { authType: clearenceType.PASEADOR };

    const middleware = tokenVerified.authGranter([clearenceType.PASEADOR]);
    middleware(mockReq, mockRes, nextFunction);
    expect(nextFunction).toHaveBeenCalled();
  });

  it('TC-60: authGranter check that check locals.authType == CLIENTE is in the list for been granted auth', async () => {
    mockRes.locals = { authType: clearenceType.CLIENTE };

    const middleware = tokenVerified.authGranter([clearenceType.CLIENTE]);
    middleware(mockReq, mockRes, nextFunction);
    expect(nextFunction).toHaveBeenCalled();
  });

  it('TC-61: authGranter check that check locals.authType == ADMIN can been granted auth', async () => {
    mockRes.locals = { authType: clearenceType.ADMIN };

    const middleware = tokenVerified.authGranter([clearenceType.ADMIN]);
    middleware(mockReq, mockRes, nextFunction);
    expect(nextFunction).toHaveBeenCalled();
  });

  it('TC-62: authGranter check that check locals.authType == ADMIN is in the list for been granted auth', async () => {
    mockRes.locals = { authType: clearenceType.ADMIN };

    const middleware = tokenVerified.authGranter([clearenceType.ADMIN, clearenceType.CLIENTE]);
    middleware(mockReq, mockRes, nextFunction);
    expect(nextFunction).toHaveBeenCalled();
  });

  it('TC-63: authGranter check that check locals.authType == PASEADOR is in the list for been granted auth', async () => {
    mockRes.locals = { authType: clearenceType.PASEADOR };

    const middleware = tokenVerified.authGranter([clearenceType.PASEADOR, clearenceType.CLIENTE]);
    middleware(mockReq, mockRes, nextFunction);
    expect(nextFunction).toHaveBeenCalled();
  });
});
