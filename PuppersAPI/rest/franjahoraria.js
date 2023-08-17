/* eslint-disable camelcase */
/**
 * @file Handling HTTP Create and Read requests for "franjaHoraria" table
 * @author Gabriel Maldonado <gabamald@espol.edu.ec>
 */

const express = require('express');
const router = express.Router();

const validator = require('../middlewares/validator.js');
const tokenVerified = require('../middlewares/tokenVerified.js');
const rateLimit = require('../middlewares/rateLimit.js');

const schemas = require('../services/schemas.js');
const clearenceType = require('../services/clearenceType.js').clearenceType;

const franjaHorariaRequest = require('../services/HTML_Request/franjaHorariaRequest.js');

router.get('/all',
  tokenVerified.authGranter([clearenceType.ADMIN]),
  (req, res, next) => {
    franjaHorariaRequest.getAll(req, res, next);
  });

router.get('/:franja_id',
  tokenVerified.authGranter([clearenceType.ADMIN, clearenceType.CLIENTE, clearenceType.PASEADOR]),
  validator(schemas.ID_FRANJA, 'params'),
  (req, res, next) => {
    franjaHorariaRequest.get(req, res, next);
  });

router.post('/add',
  rateLimit.addLimiter,
  tokenVerified.authGranter([clearenceType.ADMIN]),
  validator(schemas.FRANJA_DATA, 'body'),
  (req, res, next) => {
    franjaHorariaRequest.add(req, res, next);
  });

module.exports = router;
