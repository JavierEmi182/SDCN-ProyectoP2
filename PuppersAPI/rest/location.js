/* eslint-disable camelcase */
/**
 * @file Handling HTTP Create and Read requests for "location" table
 * @author Gabriel Maldonado <gabamald@espol.edu.ec>
 */

const express = require('express');
const router = express.Router();

const validator = require('../middlewares/validator.js');
const tokenVerified = require('../middlewares/tokenVerified.js');
const rateLimit = require('../middlewares/rateLimit.js');

const schemas = require('../services/schemas.js');
const clearenceType = require('../services/clearenceType.js').clearenceType;

const locationRequest = require('../services/HTML_Request/locationRequest.js');

router.get('/all',
  tokenVerified.authGranter([clearenceType.ADMIN]),
  (req, res, next) => {
    locationRequest.getAll(req, res, next);
  });

router.get('/:location_id',
  tokenVerified.authGranter([clearenceType.ADMIN, clearenceType.CLIENTE, clearenceType.PASEADOR]),
  validator(schemas.ID_LOCATION, 'params'),
  (req, res, next) => {
    locationRequest.get(req, res, next);
  });

router.post('/add',
  rateLimit.addLimiter,
  tokenVerified.authGranter([clearenceType.ADMIN]),
  validator(schemas.LOCATION_DATA, 'body'),
  (req, res, next) => {
    locationRequest.add(req, res, next);
  });

module.exports = router;
