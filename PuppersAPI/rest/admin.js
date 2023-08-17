/* eslint-disable camelcase */
/**
 * @file Handling HTTP CRUD requests for "admin" table and admin exclusive request
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
const paseadoresRequest = require('../services/HTML_Request/paseadoresRequest');
const adminRequest = require('../services/HTML_Request/adminRequest.js');

router.post('/log',
  rateLimit.logLimiter,
  validator(schemas.ADMIN_DATA, 'body'),
  (req, res, next) => {
    adminRequest.log(req, res, next);
  });

router.use(tokenVerified.authGranter([clearenceType.ADMIN]));

router.get('/all',
  (req, res, next) => {
    adminRequest.getAll(req, res, next);
  });

router.post('/add',
  rateLimit.addLimiter,
  validator(schemas.ADMIN_DATA, 'body'),
  (req, res, next) => {
    adminRequest.add(req, res, next);
  });

router.put('/update/auth',
  rateLimit.authUpdateLimiter,
  validator(schemas.ADMIN_DATA.concat(schemas.NEW_CREDENTIALS), 'body'),
  (req, res, next) => {
    adminRequest.updateCredentials(req, res, next);
  });

router.delete('/delete/:admin_username',
  rateLimit.deleteLimiter,
  validator(schemas.ID_ADMIN, 'params'),
  (req, res, next) => {
    adminRequest.delete(req, res, next);
  });

router.put('/restore/cliente',
  rateLimit.authUpdateLimiter,
  validator(schemas.ID_CLIENTE2, 'body'),
  (req, res, next) => {
    clientesRequest.restore(req, res, next);
  });

router.put('/restore/paseador',
  rateLimit.authUpdateLimiter,
  validator(schemas.ID_PASEADOR, 'body'),
  (req, res, next) => {
    paseadoresRequest.restore(req, res, next);
  });

module.exports = router;
