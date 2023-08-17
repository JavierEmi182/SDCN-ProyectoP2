/* eslint-disable camelcase */
/**
 * @file Methods for HTTP handling requests to "area" table
 * @author Gabriel Maldonado <gabamald@espol.edu.ec>
 */

'use strict';

const Area = require('../../models').area;

module.exports = class adminRequest {
  static getAll (req, res, next) {
    Area.findAll()
      .then(areas => {
        return res.status(200).json(areas);
      })
      .catch(error => { return res.status(400).send(error); });
  }

  static get (req, res, next) {
    const areaID = req.params.area_id;

    Area.findByPk(areaID)
      .then(area => {
        if (area === null) {
          return res.status(200).json([]);
        }
        return res.status(200).json([area]);
      })
      .catch(error => { return res.status(400).send(error); });
  }

  static async add (req, res, next) {
    const area_name = req.body.area_name;

    Area.create({
      area_name
    })
      .then(area => {
        return res.status(201).json({ area_id: area.area_id });
      })
      .catch(() => { return res.status(400).send({ error: 'Unable to add' }); });
  }
};
