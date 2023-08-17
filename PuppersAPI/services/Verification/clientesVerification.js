/**
 * @file Functions for verification pf "clientes" table credentials and users
 * @author Gabriel Maldonado <gabamald@espol.edu.ec>
 */

'use strict';

const Cliente = require('../../models').clientes;

const passwordSecurity = require('../passwordSecurity.js');

/**
 * Returns true if the clienteUser exist and false if it does not exist
 * @param {string} clienteUser
 */
async function checkUser (clienteUser) {
  const clientes = await Cliente.findAll({
    attributes: { exclude: ['client_password'] },
    where: {
      client_user: clienteUser
    }
  });

  if (clientes.length === 1) {
    return true;
  } if (clientes.length === 0) {
    return false;
  }
}

/**
 * Returns client with user clienteUser
 * @param {string} clienteUser
 */
async function getUser (clienteUser) {
  const clientes = await Cliente.findAll(
    {
      attributes: { exclude: ['client_password'] },
      where: {
        client_user: clienteUser
      }
    });
  return clientes[0].dataValues;
}

/**
 * Returns true if ther exist a cliente with clienteUser and clientPassword
 *  and false if it does not exist
 * @param {string} clienteUser
 * @param {string} clientPassword
 */
async function checkCredentials (clienteUser, clientPassword) {
  const clientes = await Cliente.findAll(
    {
      where: {
        client_user: clienteUser
      }
    });

  if (clientes.length === 1) {
    const clientSalt = clientes[0].dataValues.client_salt;
    const realPassword = clientes[0].dataValues.client_password;

    const check = passwordSecurity.hash(clientPassword.concat(clientSalt)).localeCompare(realPassword);

    return (check === 0);
  } if (clientes.length === 0) {
    return false;
  }
}

module.exports = { checkUser, checkCredentials, getUser };
