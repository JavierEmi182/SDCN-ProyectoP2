/* eslint-disable camelcase */
/**
 * @file Methods for HTTP handling requests to "paseo" table
 * @author Gabriel Maldonado <gabamald@espol.edu.ec>
 */

'use strict';
const { sequelize } = require('../../models');

const Paseos = require('../../models').paseo;

module.exports = class adminRequest {
  static getAll (req, res, next) {
    Paseos.findAll()
      .then(paseo => {
        return res.status(200).json(paseo);
      })
      .catch(error => { return res.status(400).send(error); });
  }

  static get (req, res, next) {
    const paseo_ID = req.params.paseo_ID;

    Paseos.findByPk(paseo_ID)
      .then(paseo => {
        if (paseo === null) {
          return res.status(200).json([]);
        }
        return res.status(200).json([paseo]);
      })
      .catch(error => { return res.status(400).send(error); });
  }

  static getByServicioID (req, res, next) {
    const servicioID = req.params.servicio_ID;

    sequelize.query(
      `SELECT * FROM paseo 
      WHERE end_date IS NOT NULL AND servicio_ID="${servicioID}" `
    )
      .then(paseos => {
        return res.status(200).json(paseos[0]);
      })
      .catch(error => { return res.status(400).send(error); });
  }

  static getCurrentByWalker (req, res, next) {
    const walkerID = req.params.walker_ID;

    sequelize.query(
      `SELECT * FROM paseo WHERE end_date  IS NULL  AND walker_ID="${walkerID}" `
    )
      .then(paseos => {
        return res.status(200).json(paseos[0]);
      })
      .catch(error => { return res.status(400).send(error); });
  }

  static async start (req, res, next) {
    const { walker_ID, servicio_ID } = req.body;

    Paseos.create({
      walker_ID,
      servicio_ID,
      start_date: new Date()
    })
      .then(paseo => {
        return res.status(201).json({ paseo_ID: paseo.paseo_ID });
      })
      .catch(() => { return res.status(400).send({ error: 'Unable to start' }); });
  }

  static async end (req, res, next) {
    const { paseo_ID, evidenceURL } = req.body;

    Paseos.update({
      evidenceURL,
      end_date: new Date()
    },
    {
      where: {
        paseo_ID,
        end_date: null
      },
      returning: true,
      plain: true
    })
      .then(response => {
        if (response[1] === 1) {
          return res.status(201).json({ paseo: response[1] });
        }
        return res.status(404).json({ error: 'Any paseo has not been ended' });
      })
      .catch(() => { return res.status(400).send({ error: 'Unable to end' }); });
  }
};
