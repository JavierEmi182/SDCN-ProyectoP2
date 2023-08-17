/* eslint-disable camelcase */
/**
 * @file Handling HTTP CRUD requests for "mascotas" table
 * @author Gabriel Maldonado <gabamald@espol.edu.ec>
 */

const express = require('express');
const router = express.Router();

const validator = require('../middlewares/validator.js');
const tokenVerified = require('../middlewares/tokenVerified.js');
const rateLimit = require('../middlewares/rateLimit.js');

const schemas = require('../services/schemas.js');
const clearenceType = require('../services/clearenceType.js').clearenceType;

const mascotasRequest = require('../services/HTML_Request/mascotasRequest');

router.get('/all',
  tokenVerified.authGranter([clearenceType.ADMIN]),
  (req, res, next) => {
    mascotasRequest.allMascotas(req, res, next);
  });

router.get('/:pet_token',
  tokenVerified.authGranter([clearenceType.ADMIN, clearenceType.CLIENTE, clearenceType.PASEADOR]),
  validator(schemas.ID_MASCOTA, 'params'),
  (req, res, next) => {
    mascotasRequest.getMascota(req, res, next);
  });

router.get('/cliente/:client_ID',
  tokenVerified.authGranter([clearenceType.ADMIN, clearenceType.CLIENTE]),
  validator(schemas.ID_CLIENTE2, 'params'),
  (req, res, next) => {
    mascotasRequest.getMascotaClient(req, res, next);
  });

router.get('/paseador/:walker_ID',
  tokenVerified.authGranter([clearenceType.ADMIN, clearenceType.PASEADOR]),
  validator(schemas.ID_PASEADOR, 'params'),
  (req, res, next) => {
    mascotasRequest.getMascotaWalker(req, res, next);
  });

router.get('/date/:intDate/:endDate',
  tokenVerified.authGranter([clearenceType.ADMIN]),
  validator(schemas.DATE_RANGE, 'params'),
  (req, res, next) => {
    mascotasRequest.getMascotasDate(req, res, next);
  });

router.post('/add',
  rateLimit.addLimiter,
  tokenVerified.authGranter([clearenceType.ADMIN , clearenceType.CLIENTE]),
  validator(schemas.MASCOTA_DATA, 'body'),
  (req, res, next) => {
    mascotasRequest.addMascotas(req, res, next);
  });

router.put('/update',
  rateLimit.updateLimiter,
  tokenVerified.authGranter([clearenceType.ADMIN]),
  validator(schemas.MASCOTA_UPDATE.concat(schemas.ID_MASCOTA, clearenceType.CLIENTE), 'body'),
  (req, res, next) => {
    mascotasRequest.updateMascota(req, res, next);
  });

router.delete('/delete/:pet_token',
  rateLimit.deleteLimiter,
  tokenVerified.authGranter([clearenceType.ADMIN]),
  validator(schemas.ID_MASCOTA, 'params'),
  (req, res, next) => {
    mascotasRequest.deleteMascotas(req, res, next);
  });

module.exports = router;
