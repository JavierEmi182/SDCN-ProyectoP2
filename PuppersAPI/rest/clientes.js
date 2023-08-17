/* eslint-disable camelcase */
/**
 * @file Handling HTTP CRUD requests for "clientes" table
 * @author Gabriel Maldonado <gabamald@espol.edu.ec>
 */

const express = require('express');
const router = express.Router();

const validator = require('../middlewares/validator.js');
const rateLimit = require('../middlewares/rateLimit.js');
const tokenVerified = require('../middlewares/tokenVerified.js');

const schemas = require('../services/schemas.js');
const clearenceType = require('../services/clearenceType.js').clearenceType;

const clientesRequest = require('../services/HTML_Request/clientesRequest');

router.get('/all',
  tokenVerified.authGranter([clearenceType.ADMIN]),
  (req, res, next) => {
    clientesRequest.allClients(req, res, next);
  });

router.get('/:client_ID',
  tokenVerified.authGranter([clearenceType.ADMIN, clearenceType.PASEADOR, clearenceType.CLIENTE]),

  validator(schemas.ID_CLIENTE2, 'params'),
  (req, res, next) => {
    clientesRequest.getClient(req, res, next);
  });

router.post('/add',
  rateLimit.addLimiter,
  tokenVerified.authGranter([clearenceType.ADMIN]),
  validator(schemas.CLIENTE_DATA.concat(schemas.CLIENTE_CREDENTIALS), 'body'),
  (req, res, next) => {
    clientesRequest.addClient(req, res, next);
  });

router.post('/log',
  rateLimit.logLimiter,
  validator(schemas.CLIENTE_CREDENTIALS, 'body'),
  (req, res, next) => {
    clientesRequest.logClient(req, res, next);
  });

router.put('/update',
  rateLimit.updateLimiter,
  tokenVerified.authGranter([clearenceType.ADMIN]),
  validator(schemas.CLIENTE_DATA, 'body'),
  (req, res, next) => {
    clientesRequest.updateClient(req, res, next);
  });

router.put('/update/auth',
  rateLimit.authUpdateLimiter,
  tokenVerified.authGranter([clearenceType.ADMIN, clearenceType.CLIENTE]),
  validator(schemas.CLIENTE_CREDENTIALS.concat(schemas.NEW_CREDENTIALS), 'body'),
  async function updateClientCredentials (req, res, next) {
    clientesRequest.updateClientCredentials(req, res, next);
  });

router.delete('/delete/:client_ID',
  rateLimit.deleteLimiter,
  validator(schemas.ID_CLIENTE2, 'params'),
  (req, res, next) => {
    clientesRequest.deleteClient(req, res, next);
  });

module.exports = router;
