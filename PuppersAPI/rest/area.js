/* eslint-disable camelcase */
/**
 * @file Handling HTTP Create and Read requests for "area" table
 * @author Gabriel Maldonado <gabamald@espol.edu.ec>
 */

const express = require('express');
const router = express.Router();

const validator = require('../middlewares/validator.js');
const tokenVerified = require('../middlewares/tokenVerified.js');
const rateLimit = require('../middlewares/rateLimit.js');

const schemas = require('../services/schemas.js');
const clearenceType = require('../services/clearenceType.js').clearenceType;

const areaRequest = require('../services/HTML_Request/areaRequest.js');

router.get('/all',
  tokenVerified.authGranter([clearenceType.ADMIN]),
  (req, res, next) => {
    areaRequest.getAll(req, res, next);
  });

router.get('/:area_id',
  tokenVerified.authGranter([clearenceType.ADMIN, clearenceType.CLIENTE, clearenceType.PASEADOR]),
  validator(schemas.ID_AREA, 'params'),
  (req, res, next) => {
    areaRequest.get(req, res, next);
  });

router.post('/add',
  rateLimit.addLimiter,
  tokenVerified.authGranter([clearenceType.ADMIN]),
  validator(schemas.AREA_DATA, 'body'),
  (req, res, next) => {
    areaRequest.add(req, res, next);
  });

module.exports = router;
