/* eslint-disable camelcase */
/**
 * @file Methods for HTTP handling requests to "location" table
 * @author Gabriel Maldonado <gabamald@espol.edu.ec>
 */

'use strict';

const Location = require('../../models').location;

module.exports = class adminRequest {
  static getAll (req, res, next) {
    Location.findAll()
      .then(locations => {
        return res.status(200).json(locations);
      })
      .catch(error => { return res.status(400).send(error); });
  }

  static get (req, res, next) {
    const locationID = req.params.location_id;

    Location.findByPk(locationID)
      .then(location => {
        if (location === null) {
          return res.status(200).json([]);
        }
        return res.status(200).json([location]);
      })
      .catch(error => { return res.status(400).send(error); });
  }

  static async add (req, res, next) {
    const { location_name, area_id } = req.body;

    Location.create({
      location_name,
      area_id
    })
      .then(location => {
        return res.status(201).json({ location_id: location.location_id });
      })
      .catch(() => { return res.status(400).send({ error: 'Unable to add' }); });
  }
};
