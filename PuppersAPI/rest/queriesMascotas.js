/**
 * @file Handling queries for "mascotas" table
 * @author Gabriel Maldonado <gabamald@espol.edu.ec>
 */

const express = require('express');
const router = express.Router();
const Joi = require('joi');

const validator = require('../middlewares/validator.js');
const tokenVerified = require('../middlewares/tokenVerified.js');

const mascotasQuerys = require('../services/DB_Querys/mascotasQuerys.js');
const clearenceType = require('../services/clearenceType.js').clearenceType;

router.use(tokenVerified.authGranter([clearenceType.ADMIN]));

router.get('/clientes/paseadores/all',
  (req, res, next) => {
    mascotasQuerys.allMacotasClientesPaseadores(req, res, next);
  });

router.get('/clientes/all',
  (req, res, next) => {
    mascotasQuerys.allMacotasClientes(req, res, next);
  });

router.get('/clientes/area/:area',
  validator(Joi.object({ area: Joi.string().required() }), 'params'),
  (req, res, next) => {
    mascotasQuerys.allMacotasClientesArea(req, res, next);
  });

router.get('/clientes/location/:location',
  validator(Joi.object({ location: Joi.string().required() }), 'params'),
  (req, res, next) => {
    mascotasQuerys.allMacotasClientesLocation(req, res, next);
  });

router.get('/paseadores/all',
  (req, res, next) => {
    mascotasQuerys.allMacotasPaseadores(req, res, next);
  });

router.get('/paseadores/:walker_name',
  validator(Joi.object({ walker_name: Joi.string().required() }), 'params'),
  (req, res, next) => {
    mascotasQuerys.allMacotasPaseadoresName(req, res, next);
  });

module.exports = router;
