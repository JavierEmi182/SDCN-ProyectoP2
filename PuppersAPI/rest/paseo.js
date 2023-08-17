/* eslint-disable camelcase */
/**
 * @file Handling HTTP Create and Read requests for "paseo" table
 * @author Gabriel Maldonado <gabamald@espol.edu.ec>
 */

const express = require('express');
const router = express.Router();

const validator = require('../middlewares/validator.js');
const tokenVerified = require('../middlewares/tokenVerified.js');
const rateLimit = require('../middlewares/rateLimit.js');

const schemas = require('../services/schemas.js');
const clearenceType = require('../services/clearenceType.js').clearenceType;

const paseoRequest = require('../services/HTML_Request/paseoRequest.js');
const countPaseos = require('../services/DB_Querys/countPaseos.js');

router.get('/all',
  tokenVerified.authGranter([clearenceType.ADMIN, clearenceType.PASEADOR, clearenceType.CLIENTE]),
  (req, res, next) => {
    paseoRequest.getAll(req, res, next);
  });

router.get('/:paseo_ID',
  tokenVerified.authGranter([clearenceType.ADMIN, clearenceType.PASEADOR, clearenceType.CLIENTE]),
  validator(schemas.ID_PASEO, 'params'),
  (req, res, next) => {
    paseoRequest.get(req, res, next);
  });

router.get('/servicio/:servicio_ID',
  tokenVerified.authGranter([clearenceType.ADMIN, clearenceType.PASEADOR, clearenceType.CLIENTE]),
  validator(schemas.ID_SERVICIOS, 'params'),
  (req, res, next) => {
    paseoRequest.getByServicioID(req, res, next);
  });

router.get('/paseador/current/:walker_ID',
  tokenVerified.authGranter([clearenceType.ADMIN, clearenceType.PASEADOR]),
  validator(schemas.ID_PASEADOR, 'params'),
  (req, res, next) => {
    paseoRequest.getCurrentByWalker(req, res, next);
  });

router.get('/count/paseador/:walker_ID',
  tokenVerified.authGranter([clearenceType.ADMIN, clearenceType.PASEADOR, clearenceType.CLIENTE]),
  validator(schemas.ID_PASEADOR, 'params'),
  (req, res, next) => {
    countPaseos.countByWalker(req, res, next);
  });

router.get('/count/mascota/:pet_token',
  tokenVerified.authGranter([clearenceType.ADMIN, clearenceType.PASEADOR, clearenceType.CLIENTE]),
  validator(schemas.ID_MASCOTA, 'params'),
  (req, res, next) => {
    countPaseos.countByPet(req, res, next);
  });

router.get('/count/mascota/paseador/:pet_token/:walker_ID',
  tokenVerified.authGranter([clearenceType.ADMIN, clearenceType.PASEADOR, clearenceType.CLIENTE]),
  validator(schemas.ID_MASCOTA.concat(schemas.ID_PASEADOR), 'params'),
  (req, res, next) => {
    countPaseos.countByPetWalker(req, res, next);
  });

router.get('/count/paseador/servicio/:walker_ID/:servicio_ID',
  tokenVerified.authGranter([clearenceType.ADMIN]),
  validator(schemas.ID_PASEADOR.concat(schemas.ID_SERVICIOS), 'params'),
  (req, res, next) => {
    countPaseos.countByWalkerService(req, res, next);
  });

router.post('/start',
  tokenVerified.authGranter([clearenceType.ADMIN, clearenceType.PASEADOR]),
  rateLimit.addLimiter,
  validator(schemas.PASEO_INIT, 'body'),
  (req, res, next) => {
    paseoRequest.start(req, res, next);
  });

router.put('/end',
  tokenVerified.authGranter([clearenceType.ADMIN, clearenceType.PASEADOR]),
  rateLimit.deleteLimiter,
  validator(schemas.PASEO_END.concat(schemas.ID_PASEO), 'body'),
  (req, res, next) => {
    paseoRequest.end(req, res, next);
  });

module.exports = router;
