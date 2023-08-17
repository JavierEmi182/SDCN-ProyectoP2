/* eslint-disable camelcase */
/**
 * @file Methods counting contend in "paseo" table
 * @author Gabriel Maldonado <gabamald@espol.edu.ec>
 */

const { sequelize } = require('../../models');

module.exports = class mascotasQuerys {
  static countByWalker (req, res, next) {
    const walkerID = req.params.walker_ID;

    sequelize.query(
        `SELECT  paseo.servicio_ID ,  paseo.walker_ID  FROM paseo 
        WHERE end_date IS NOT NULL AND paseo.walker_ID="${walkerID}" `
    )
      .then(paseos => {
        return res.status(200).json({ total: paseos[0].length });
      })
      .catch(error => { return res.status(400).send(error); });
  }

  static countByPet (req, res, next) {
    const petToken = req.params.pet_token;

    sequelize.query(
        `SELECT  servicio.servicio_ID ,  paseo.walker_ID , servicio.pet_token FROM paseo 
        INNER JOIN servicio ON paseo.servicio_ID = servicio.servicio_ID 
        WHERE end_date IS NOT NULL AND servicio.pet_token =${petToken} `
    )
      .then(paseos => {
        return res.status(200).json({ total: paseos[0].length });
      })
      .catch(error => { return res.status(400).send(error); });
  }

  static countByPetWalker (req, res, next) {
    const petToken = req.params.pet_token;
    const walkerID = req.params.walker_ID;

    sequelize.query(
        `SELECT  servicio.servicio_ID ,  paseo.walker_ID , servicio.pet_token FROM paseo 
        INNER JOIN servicio ON paseo.servicio_ID = servicio.servicio_ID 
        WHERE end_date IS NOT NULL AND servicio.pet_token =${petToken} AND paseo.walker_ID="${walkerID}" `
    )
      .then(paseos => {
        return res.status(200).json({ total: paseos[0].length });
      })
      .catch(error => { return res.status(400).send(error); });
  }

  static countByWalkerService (req, res, next) {
    const walkerID = req.params.walker_ID;
    const servicio_ID = req.params.servicio_ID;

    sequelize.query(
        `SELECT  paseo.servicio_ID ,  paseo.walker_ID  FROM paseo 
        WHERE end_date IS NOT NULL AND paseo.walker_ID="${walkerID}" AND paseo.servicio_ID=${servicio_ID}`
    )
      .then(paseos => {
        return res.status(200).json({ total: paseos[0].length });
      })
      .catch(error => { return res.status(400).send(error); });
  }
};
