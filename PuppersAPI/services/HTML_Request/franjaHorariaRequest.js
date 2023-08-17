/* eslint-disable camelcase */
/**
 * @file Methods for HTTP handling requests to "franjaHoraria" table
 * @author Gabriel Maldonado <gabamald@espol.edu.ec>
 */

'use strict';

const FranjaHoraria = require('../../models').franjahoraria;

function MinutesToHours (timeMinutes) {
  let strHour = '';
  let strMinutes = '';

  const hour = Math.floor(timeMinutes / 60);
  const minutes = timeMinutes % 60;

  strHour = parseInt(hour);

  strMinutes = parseInt(minutes);
  if (minutes >= 0 && minutes <= 9) {
    strMinutes = '0' + parseInt(minutes);
  }

  return strHour + ':' + strMinutes;
}

module.exports = class adminRequest {
  static getAll (req, res, next) {
    FranjaHoraria.findAll()
      .then(franjas => {
        return res.status(200).json(franjas);
      })
      .catch(error => { return res.status(400).send(error); });
  }

  static get (req, res, next) {
    const franjaID = req.params.franja_id;

    FranjaHoraria.findByPk(franjaID)
      .then(franja => {
        if (franja === null) {
          return res.status(200).json([]);
        }
        return res.status(200).json([franja]);
      })
      .catch(error => { return res.status(400).send(error); });
  }

  static async add (req, res, next) {
    const { start_minute, end_minute } = req.body;

    if (start_minute >= end_minute) {
      return res.status(409).json({ error: 'Time range not valid' });
    }
    const convertTime = MinutesToHours(start_minute) + '-' + MinutesToHours(end_minute);

    FranjaHoraria.create({
      start_minute,
      end_minute,
      convertido: convertTime
    })
      .then(franja => {
        return res.status(201).json({ convertido: convertTime, franja_id: franja.franja_id });
      })
      .catch(() => { return res.status(400).send({ error: 'Unable to add' }); });
  }
};
