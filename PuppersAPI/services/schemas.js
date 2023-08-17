'use strict';

const Joi = require('joi');

const MINPass = 8;
const MAXPass = 100;
const MINuser = 5;
const MAXuser = 18;
const MINTelf = 10;
const MaxTelf = 12;
const MINName = 8;
const MaxName = 128;

const user = Joi.string().min(MINuser).max(MAXuser).required();
const password = Joi.string().min(MINPass).max(MAXPass).required();
const telephone = Joi.string().min(MINTelf).max(MaxTelf).regex(/^[0-9]+$/).required().messages({ 'string.pattern.base': 'Phone number format it wrong.' }).required();
const email = Joi.string().email({ tlds: { allow: false } });
const date = Joi.date().required();
const CID = Joi.string().min(10).max(10).regex(/^[0-9]+$/).required();
const longName = Joi.string().min(MINName).max(MaxName).regex(/^[a-zA-Z]+(?:\s[a-zA-Z]+)*$/).required();
const shortName = Joi.string().min(2).max(MaxName).regex(/^[a-zA-Z]+(?:\s[a-zA-Z]+)*$/).required();
const petName = Joi.string().min(2).max(20).regex(/^[a-zA-Z]+(?:\s[a-zA-Z]+)*$/).required();
const plases = Joi.string().min(2).max(100).regex(/^[a-zA-Z]+(?:\s[a-zA-Z]+)*$/).required();
const intId = Joi.number().positive().integer().required();
const integerTime = Joi.number().positive().integer().min(0).max(24 * 60 - 1).required();

const schemas = {

  AREA_DATA: Joi.object({
    area_name: plases
  }),
  ID_AREA: Joi.object({
    area_id: intId
  }),
  LOCATION_DATA: Joi.object({
    location_name: plases,
    area_id: intId
  }),
  ID_LOCATION: Joi.object({
    location_id: intId
  }),
  FRANJA_DATA: Joi.object({
    start_minute: integerTime,
    end_minute: integerTime
  }),
  ID_FRANJA: Joi.object({
    franja_id: intId
  }),
  CLIENTE_DATA: Joi.object({
    client_tel: telephone,
    client_ID: CID,
    client_name: longName,
    start_date: date,
    client_email: email,
    location_id: Joi.number().integer().required(),
    address_link: Joi.string().uri()
  }),
  ID_CLIENTE: Joi.object({
    client_tel: telephone
  }),
  ID_CLIENTE2: Joi.object({
    client_ID: CID
  }),
  CLIENTE_CREDENTIALS: Joi.object({
    client_user: user,
    client_password: password
  }),

  PASEADOR_DATA: Joi.object({
    walker_tel: telephone,
    walker_name: shortName,
    start_date: date,
    walker_address: Joi.string().max(254).required(),
    walker_linkaddress: Joi.string().max(510).uri(),
    walker_photoURL: Joi.string().max(510).uri(),
    walker_bloodtype: Joi.string().min(1).max(3).required()
  }),
  ID_PASEADOR: Joi.object({
    walker_ID: CID
  }),
  PASEADOR_CREDENTIALS: Joi.object({
    walker_user: user,
    walker_password: password
  }),

  MASCOTA_DATA: Joi.object({
    client_ID: CID,
    pet_name: petName,
    pet_breed: Joi.string().min(3).max(50).required(),
    service: Joi.string().min(2).max(2).required(),
    renovation_date: date
  }),

  MASCOTA_UPDATE: Joi.object({
    client_ID: CID,
    pet_name: petName,
    pet_breed: Joi.string().min(3).max(50).required(),
    service: Joi.string().min(2).max(2).required(),
    renovation_date: date
  }),

  ID_MASCOTA: Joi.object({
    pet_token: intId
  }),

  SERVICIOS_DATA: Joi.object({
    franja_id: intId,
    walker_ID: CID
  }),
  ID_SERVICIOS: Joi.object({
    servicio_ID: intId
  }),
  PASEO_INIT: Joi.object({
    walker_ID: CID,
    servicio_ID: intId
  }),
  PASEO_END: Joi.object({
    evidenceURL: Joi.string().uri()
  }),
  ID_PASEO: Joi.object({
    paseo_ID: intId
  }),

  ADMIN_DATA: Joi.object({
    admin_username: user,
    admin_password: password
  }),

  ID_ADMIN: Joi.object({
    admin_username: user
  }),

  DATE_RANGE: Joi.object({
    intDate: date,
    endDate: date
  }),
  NEW_CREDENTIALS: Joi.object({
    new_user: user,
    new_password: password
  })
};
module.exports = schemas;
