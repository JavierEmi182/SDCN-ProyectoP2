/* eslint-disable camelcase */
/**
 * @file Handling HTTP CRUD requests for "paseadores" table
 * @author Gabriel Maldonado <gabamald@espol.edu.ec>
 */

const express = require('express');
const router = express.Router();

const validator = require('../middlewares/validator.js');
const tokenVerified = require('../middlewares/tokenVerified.js');
const rateLimit = require('../middlewares/rateLimit.js');

const schemas = require('../services/schemas.js');
const clearenceType = require('../services/clearenceType.js').clearenceType;

const paseadoresRequest = require('../services/HTML_Request/paseadoresRequest');

router.get('/all',
  tokenVerified.authGranter([clearenceType.ADMIN]),
  (req, res, next) => {
    paseadoresRequest.allWalkers(req, res, next);
  });

router.get('/:walker_ID',
  tokenVerified.authGranter([clearenceType.ADMIN, clearenceType.CLIENTE, clearenceType.PASEADOR]),
  validator(schemas.ID_PASEADOR, 'params'),

  (req, res, next) => {
    paseadoresRequest.getWalkers(req, res, next);
  });

router.post('/add',
  rateLimit.addLimiter,
  tokenVerified.authGranter([clearenceType.ADMIN]),
  validator(schemas.PASEADOR_DATA
    .concat(schemas.PASEADOR_CREDENTIALS).concat(schemas.ID_PASEADOR), 'body'),
  (req, res, next) => {
    paseadoresRequest.addWalker(req, res, next);
  });

router.post('/log',
  rateLimit.logLimiter,
  validator(schemas.PASEADOR_CREDENTIALS, 'body'),
  (req, res, next) => {
    paseadoresRequest.logWalker(req, res, next);
  });

router.put('/update',
  rateLimit.updateLimiter,
  tokenVerified.authGranter([clearenceType.ADMIN]),
  validator(schemas.PASEADOR_DATA.concat(schemas.ID_PASEADOR), 'body'),
  (req, res, next) => {
    paseadoresRequest.updateWalker(req, res, next);
  });

router.put('/update/auth',
  rateLimit.authUpdateLimiter,
  tokenVerified.authGranter([clearenceType.ADMIN, clearenceType.PASEADOR]),
  validator(schemas.PASEADOR_CREDENTIALS.concat(schemas.NEW_CREDENTIALS), 'body'),
  (req, res, next) => {
    paseadoresRequest.updateWalkerCredentials(req, res, next);
  });

router.delete('/delete/:walker_ID',
  rateLimit.deleteLimiter,
  tokenVerified.authGranter([clearenceType.ADMIN]),
  validator(schemas.ID_PASEADOR, 'params'),
  (req, res, next) => {
    paseadoresRequest.deleteWalker(req, res, next);
  });

module.exports = router;
