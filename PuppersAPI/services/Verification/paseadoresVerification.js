/**
 * @file Functions for verification pf "paseadores" table credentials , users and walker_ID
 * @author Gabriel Maldonado <gabamald@espol.edu.ec>
 */

'use strict';

const Paseadores = require('../../models').paseadores;

const passwordSecurity = require('../passwordSecurity.js');

/**
 * Returns true if the walker_user exist and false if it does not exist
 * @param {string} walkerUser
 */
async function checkUser (walkerUser) {
  const paseadores = await Paseadores.findAll(
    {
      attributes: { exclude: ['walker_password'] },
      where: {
        walker_user: walkerUser
      }
    });

  if (paseadores.length === 1) {
    return true;
  } if (paseadores.length === 0) {
    return false;
  }
}

/**
 * Returns client with user cliente_user
 * @param {string} walkerUser
 */
async function getUser (walkerUser) {
  const paseadores = await Paseadores.findAll(
    {
      attributes: { exclude: ['walker_password'] },
      where: {
        walker_user: walkerUser
      }
    });
  return paseadores[0].dataValues;
}

/**
 * Returns true if the petToken exist and false if it does not exist
 * @param {number} petToken
 */
async function checkID (walkerID) {
  const mascotas = await Paseadores.findByPk(walkerID);
  if (mascotas === null) {
    return false;
  }
  return true;
}

/**
 * Returns mascota with the petToken
 * @param {number} petToken
 */
async function getPaseador (walkerID) {
  const mascotas = await Paseadores.findByPk(walkerID);
  return mascotas;
}

/**
 * Returns true if ther exist a cliente with walker_user and walker_password
 *  and false if it does not exist
 * @param {string} walkerUser
 * @param {string} walkerPassword
 */
async function checkCredentials (walkerUser, walkerPassword) {
  const paseadores = await Paseadores.findAll(
    {
      where: {
        walker_user: walkerUser
      }
    });

  if (paseadores.length === 1) {
    const walkerSalt = paseadores[0].dataValues.walker_salt;
    const realPassword = paseadores[0].dataValues.walker_password;

    const check = passwordSecurity.hash(walkerPassword.concat(walkerSalt)).localeCompare(realPassword);

    return (check === 0);
  } if (paseadores.length === 0) {
    return false;
  }
}

module.exports = { checkUser, checkCredentials, getUser, checkID, getPaseador };
