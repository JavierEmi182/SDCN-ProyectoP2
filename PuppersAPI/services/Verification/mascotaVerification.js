/**
 * @file Functions for verification of "mascotas" table pet_token
 * @author Gabriel Maldonado <gabamald@espol.edu.ec>
 */

'use strict';

const Mascota = require('../../models').mascotas;

/**
 * Returns true if the petToken exist and false if it does not exist
 * @param {number} petToken
 */
async function checkID (petToken) {
  const mascotas = await Mascota.findByPk(petToken);
  if (mascotas === null) {
    return false;
  }
  return true;
}

/**
 * Returns mascota with the petToken
 * @param {number} petToken
 */
async function getMascota (petToken) {
  const mascotas = await Mascota.findByPk(petToken);
  return mascotas;
}

module.exports = { checkID, getMascota };
