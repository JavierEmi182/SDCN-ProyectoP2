/* eslint-disable camelcase */
/**
 * @file Methods for HTTP handling requests to "mascotas" table
 * @author Gabriel Maldonado <gabamald@espol.edu.ec>
 */

'use strict';

const { Op } = require('sequelize');
const { sequelize } = require('../../models');

const Mascotas = require('../../models').mascotas;

module.exports = class mascotasRequest {
  static allMascotas (req, res, next) {
    Mascotas.findAll()
      .then(mascotas => {
        return res.status(200).json(mascotas);
      })
      .catch(error => { return res.status(400).send(error); });
  }

  static getMascota (req, res, next) {
    const petToken = req.params.pet_token;

    Mascotas.findByPk(petToken)
      .then(mascota => {
        if (mascota === null) {
          return res.status(200).json([]);
        }
        return res.status(200).json([mascota]);
      })
      .catch(error => { return res.status(400).send(error); });
  }

  static getMascotaClient (req, res, next) {
    const clientID = req.params.client_ID;

    Mascotas.findAll({
      attributes: { exclude: ['client_password', 'clientSalt'] },
      where: {
        client_ID: clientID
      }
    })
      .then(mascotas => {
        return res.status(200).json(mascotas);
      })
      .catch(error => { return res.status(400).send(error); });
  }

  static getMascotaWalker (req, res, next) {
    const walkerID = req.params.walker_ID;

    sequelize.query(
      `select mascotas.* , servicio.walker_ID  from mascotas inner join
       servicio ON mascotas.pet_token=servicio.pet_token AND servicio.walker_ID=${walkerID}`
    )
      .then(mascotas => {
        return res.status(200).json(mascotas[0]);
      })
      .catch(error => { return res.status(400).send(error); });
  }

  static getMascotasDate (req, res, next) {
    const intDate = req.params.intDate;
    const endDate = req.params.endDate;

    Mascotas.findAll({
      where: {
        renovation_date: {
          [Op.between]: [intDate, endDate]
        }
      }
    })
      .then(mascotas => {
        return res.status(200).json(mascotas);
      })
      .catch(error => { return res.status(400).send(error); });
  }

  static addMascotas (req, res, next) {
    const { client_ID, pet_name, pet_breed, service, renovation_date } = req.body;

    Mascotas.create({
      client_ID,
      pet_name,
      pet_breed,
      service,
      renovation_date: Date.parse(renovation_date)

    })
      .then(mascotas => {
        return res.status(201).json({ pet_token: mascotas.dataValues.pet_token });
      })
      .catch(() => { return res.status(400).send({ error: 'Unable to add' }); });
  }

  static updateMascota (req, res, next) {
    const { pet_token, client_ID, pet_name, pet_breed, service, renovation_date } = req.body;

    Mascotas.update({
      client_ID,
      pet_name,
      pet_breed,
      service,
      renovation_date: Date.parse(renovation_date)

    },
    {
      where: {
        pet_token
      },
      returning: true,
      plain: true
    })
      .then(response => {
        if (response[1] === 1) {
          return res.status(201).json({ pet_token });
        }
        return res.status(404).json({ error: 'No data has been update' });
      })
      .catch(() => { return res.status(400).send({ error: 'Unable to update' }); });
  }

  static deleteMascotas (req, res, next) {
    const petToken = req.params.pet_token;

    Mascotas.destroy({
      where: {
        pet_token: petToken
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
