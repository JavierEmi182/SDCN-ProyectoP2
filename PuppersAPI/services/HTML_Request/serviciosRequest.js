/* eslint-disable camelcase */
/**
 * @file Methods for HTTP handling requests to "servicio" table
 * @author Gabriel Maldonado <gabamald@espol.edu.ec>
 */

'use strict';

const Servicios = require('../../models').servicio;
const mascotaVerification = require('../Verification/mascotaVerification.js');
const paseadoresVerification = require('../Verification/paseadoresVerification.js');

module.exports = class adminRequest {
  static getAll (req, res, next) {
    Servicios.findAll()
      .then(servicios => {
        return res.status(200).json(servicios);
      })
      .catch(error => { return res.status(400).send(error); });
  }

  static get (req, res, next) {
    const servicioID = req.params.servicio_ID;

    Servicios.findByPk(servicioID)
      .then(servicio => {
        if (servicio === null) {
          return res.status(200).json([]);
        }
        return res.status(200).json([servicio]);
      })
      .catch(error => { return res.status(400).send(error); });
  }

  static getByPetToken (req, res, next) {
    const petToken = req.params.pet_token;
    Servicios.findAll({
      where: {
        pet_token: petToken
      }
    })
      .then(servicio => {
        if (servicio.length > 0) {
          return res.status(200).json([servicio[servicio.length - 1]]);
        }
        return res.status(200).json([]);
      })
      .catch(error => { return res.status(400).send(error); });
  }

  static getAllPetToken (req, res, next) {
    const petToken = req.params.pet_token;
    Servicios.findAll({
      where: {
        pet_token: petToken
      }
    })
      .then(servicio => {
        return res.status(200).json(servicio);
      })
      .catch(error => { return res.status(400).send(error); });
  }

  static getAllWalkerID (req, res, next) {
    const walkerID = req.params.walker_ID;
    Servicios.findAll({
      where: {
        walker_ID: walkerID
      }
    })
      .then(servicio => {
        return res.status(200).json(servicio);
      })
      .catch(error => { return res.status(400).send(error); });
  }

  static getPetToken_WalkerID (req, res, next) {
    const petToken = req.params.pet_token;
    const walkerID = req.params.walker_ID;
    Servicios.findAll({
      where: {
        walker_ID: walkerID,
        pet_token: petToken
      }
    })
      .then(servicio => {
        return res.status(200).json(servicio);
      })
      .catch(error => { return res.status(400).send(error); });
  }

  static async add (req, res, next) {
    const { pet_token, franja_id, walker_ID } = req.body;

    const checkMascota = await mascotaVerification.checkID(pet_token);
    if (!checkMascota) {
      return res.status(409).json({ error: 'Pet Token does not exist' });
    }

    const checkPaseador = await paseadoresVerification.checkID(walker_ID);
    if (!checkPaseador) {
      return res.status(409).json({ error: 'walker_ID does not exist' });
    }

    if (walker_ID.localeCompare('0000000000') === 0) {
      return res.status(409).json({ error: 'walker_ID not valid' });
    }

    Servicios.create({
      pet_token,
      walker_ID,
      franja_id
    })
      .then(servicio => {
        return res.status(201).json({ servicio_ID: servicio.servicio_ID });
      })
      .catch(() => { return res.status(400).send({ error: 'Unable to add' }); });
  }

  static async update (req, res, next) {
    const { servicio_ID, franja_id, walker_ID } = req.body;

    const checkPaseador = await paseadoresVerification.checkID(walker_ID);
    if (!checkPaseador) {
      return res.status(409).json({ error: 'walker_ID does not exist' });
    }

    if (walker_ID.localeCompare('0000000000') === 0) {
      return res.status(409).json({ error: 'walker_ID not valid' });
    }

    Servicios.update({
      walker_ID,
      franja_id
    },
    {
      where: {
        servicio_ID
      },
      returning: true,
      plain: true
    })
      .then(response => {
        if (response[1] === 1) {
          return res.status(201).json({ servicio_ID });
        }
        return res.status(404).json({ error: 'No data has been update' });
      })
      .catch(() => { return res.status(400).send({ error: 'Unable to update' }); });
  }

  static async delete (req, res, next) {
    const servicioID = req.params.servicio_ID;
    Servicios.destroy({
      where: {
        servicio_ID: servicioID
      }
    })
      .then(respuesta => {
        if (respuesta === 1) {
          return res.status(200).json(1);
        }
        return res.status(404).json(0);
      })
      .catch(() => { return res.status(400).send({ error: 'Unable to delete' }); });
  }
};
