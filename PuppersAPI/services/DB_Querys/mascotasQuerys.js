/* eslint-disable camelcase */
/**
 * @file Methods for Handling queries for "mascotas" table
 * @author Gabriel Maldonado <gabamald@espol.edu.ec>
 */

const { sequelize } = require('../../models');

module.exports = class mascotasQuerys {
  static allMacotasClientesPaseadores (req, res, next) {
    sequelize.query(
          `SELECT client_name,  pet_name, walker_name,  service, pet_breed , location_name as location, area_name as area FROM clientes 
          INNER JOIN mascotas ON clientes.client_ID=mascotas.client_ID 
          INNER JOIN servicio ON mascotas.pet_token=servicio.pet_token INNER JOIN paseadores ON paseadores.walker_ID=servicio.walker_ID
          INNER JOIN location ON clientes.location_id = location.location_id INNER JOIN area  ON area.area_id = location.area_id `
    )
      .then(mascotas => {
        return res.status(200).json(mascotas[0]);
      })
      .catch(error => { return res.status(400).send(error); });
  }

  static allMacotasClientes (req, res, next) {
    sequelize.query(
      `SELECT  area_name as area ,location_name as location ,client_name, pet_name , service, pet_breed FROM clientes 
      INNER JOIN mascotas ON clientes.client_ID=mascotas.client_ID 
      INNER JOIN location INNER JOIN area ON clientes.location_id = location.location_id AND area.area_id = location.area_id  
      ORDER BY area_name`
    )
      .then(mascotas => {
        return res.status(200).json(mascotas[0]);
      })
      .catch(error => { return res.status(400).send(error); });
  }

  static allMacotasClientesArea (req, res, next) {
    const area = req.params.area;

    sequelize.query(
      `SELECT  area_name as area ,location_name as location ,client_name, pet_name , service, pet_breed FROM clientes 
      INNER JOIN mascotas ON clientes.client_ID=mascotas.client_ID 
      INNER JOIN location INNER JOIN area ON clientes.location_id = location.location_id AND area.area_id = location.area_id
       AND area.area_name="${area}"`
    )
      .then(mascotas => {
        return res.status(200).json(mascotas[0]);
      })
      .catch(error => { return res.status(400).send(error); });
  }

  static allMacotasClientesLocation (req, res, next) {
    const location = req.params.location;

    sequelize.query(
      ` SELECT  area_name as area ,location_name as location ,client_name, pet_name , service, pet_breed FROM clientes 
      INNER JOIN mascotas ON clientes.client_ID=mascotas.client_ID 
      INNER JOIN location ON clientes.location_id = location.location_id INNER JOIN area  ON area.area_id = location.area_id  
      AND location.location_name="${location}"
      ORDER BY area_name`

    )
      .then(mascotas => {
        return res.status(200).json(mascotas[0]);
      })
      .catch(error => { return res.status(400).send(error); });
  }

  static allMacotasPaseadores (req, res, next) {
    sequelize.query(
      `SELECT walker_name, pet_name,service, pet_breed , area_name as area ,location_name as location FROM clientes
      INNER JOIN mascotas ON clientes.client_ID=mascotas.client_ID 
      INNER JOIN servicio ON mascotas.pet_token=servicio.pet_token INNER JOIN paseadores ON paseadores.walker_ID=servicio.walker_ID
      INNER JOIN location ON clientes.location_id = location.location_id INNER JOIN area  ON area.area_id = location.area_id `
    )
      .then(mascotas => {
        return res.status(200).json(mascotas[0]);
      })
      .catch(error => { return res.status(400).send(error); });
  }

  static allMacotasPaseadoresName (req, res, next) {
    const walkerName = req.params.walker_name;

    sequelize.query(
      `SELECT walker_name, pet_name,service, pet_breed , area_name as area ,location_name as location FROM clientes
      INNER JOIN mascotas ON clientes.client_ID=mascotas.client_ID 
      INNER JOIN servicio ON mascotas.pet_token=servicio.pet_token INNER JOIN paseadores ON paseadores.walker_ID=servicio.walker_ID
      INNER JOIN location ON clientes.location_id = location.location_id INNER JOIN area  ON area.area_id = location.area_id 
       AND paseadores.walker_name="${walkerName}"`
    )
      .then(mascotas => {
        return res.status(200).json(mascotas[0]);
      })
      .catch(error => { return res.status(400).send(error); });
  }
};
