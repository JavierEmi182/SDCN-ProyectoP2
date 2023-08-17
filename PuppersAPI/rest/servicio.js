/* eslint-disable camelcase */
/**
 * @file Handling HTTP Create and Read requests for "servicio" table
 * @author Gabriel Maldonado <gabamald@espol.edu.ec>
 */

const express = require('express');
const router = express.Router();

const validator = require('../middlewares/validator.js');
const tokenVerified = require('../middlewares/tokenVerified.js');
const rateLimit = require('../middlewares/rateLimit.js');

const schemas = require('../services/schemas.js');
const clearenceType = require('../services/clearenceType.js').clearenceType;

const serviciosRequest = require('../services/HTML_Request/serviciosRequest.js');

router.get('/all',
  tokenVerified.authGranter([clearenceType.ADMIN]),
  (req, res, next) => {
    serviciosRequest.getAll(req, res, next);
  });

router.get('/:servicio_ID',
  tokenVerified.authGranter([clearenceType.ADMIN, clearenceType.PASEADOR, clearenceType.CLIENTE]),
  validator(schemas.ID_SERVICIOS, 'params'),
  (req, res, next) => {
    serviciosRequest.get(req, res, next);
  });

router.get('/mascotas/:pet_token',
  tokenVerified.authGranter([clearenceType.ADMIN, clearenceType.CLIENTE, clearenceType.PASEADOR]),
  validator(schemas.ID_MASCOTA, 'params'),
  (req, res, next) => {
    serviciosRequest.getByPetToken(req, res, next);
  });

router.get('/mascotas/all/:pet_token',
  tokenVerified.authGranter([clearenceType.ADMIN, clearenceType.CLIENTE]),
  validator(schemas.ID_MASCOTA, 'params'),
  (req, res, next) => {
    serviciosRequest.getAllPetToken(req, res, next);
  });

router.get('/paseadores/:walker_ID',
  tokenVerified.authGranter([clearenceType.ADMIN, clearenceType.PASEADOR]),
  validator(schemas.ID_PASEADOR, 'params'),
  (req, res, next) => {
    serviciosRequest.getAllWalkerID(req, res, next);
  });

router.get('/mascota/paseador/:pet_token/:walker_ID',
  tokenVerified.authGranter([clearenceType.ADMIN, clearenceType.PASEADOR]),
  validator(schemas.ID_MASCOTA.concat(schemas.ID_PASEADOR), 'params'),
  (req, res, next) => {
    serviciosRequest.getPetToken_WalkerID(req, res, next);
  });

router.post('/add',
  rateLimit.addLimiter,
  tokenVerified.authGranter([clearenceType.ADMIN]),
  validator(schemas.SERVICIOS_DATA.concat(schemas.ID_MASCOTA), 'body'),
  (req, res, next) => {
    serviciosRequest.add(req, res, next);
  });

router.put('/update',
  rateLimit.updateLimiter,
  tokenVerified.authGranter([clearenceType.ADMIN]),
  validator(schemas.SERVICIOS_DATA.concat(schemas.ID_SERVICIOS), 'body'),
  (req, res, next) => {
    serviciosRequest.update(req, res, next);
  });

router.delete('/delete/:servicio_ID',
  rateLimit.deleteLimiter,
  tokenVerified.authGranter([clearenceType.ADMIN]),
  validator(schemas.ID_SERVICIOS, 'params'),
  (req, res, next) => {
    serviciosRequest.delete(req, res, next);
  });

module.exports = router;
