'use strict';
/**
 * @file Functions for verification pf "admin" table credentials and users
 * @author Gabriel Maldonado <gabamald@espol.edu.ec>
 */

const Admin = require('../../models').admin;

const passwordSecurity = require('../passwordSecurity.js');

/**
 * Returns true if the admin_username exist and false if it does not exist
 * @param {string} adminUsername
 */
async function checkUser (adminUsername) {
  const admins = await Admin.findAll({
    attributes: { exclude: ['admin_password'] },
    where: {
      admin_username: adminUsername
    }
  });

  if (admins.length === 1) {
    return true;
  } if (admins.length === 0) {
    return false;
  }
}

/**
 * Returns client with user admin_username if it exist
 * @param {string} adminUsername
 */
async function getUser (adminUsername) {
  const admins = await Admin.findAll(
    {
      attributes: { exclude: ['admin_password'] },
      where: {
        admin_username: adminUsername
      }
    });

  return admins[0].dataValues;
}

/**
 * Returns true if ther exist a cliente with admin_username and admin_password
 *  and false if it does not exist
 * @param {string} adminUsername
 * @param {string} adminPassword
 */
async function checkCredentials (adminUsername, adminPassword) {
  const admins = await Admin.findAll({
    where: {
      admin_username: adminUsername
    }
  });

  if (admins.length === 1) {
    const adminSalt = admins[0].dataValues.admin_salt;
    const realPassword = admins[0].dataValues.admin_password;
    const check = passwordSecurity.hash(adminPassword.concat(adminSalt)).localeCompare(realPassword);

    return (check === 0);
  } if (admins.length === 0) {
    return false;
  }
}

module.exports = { checkUser, checkCredentials, getUser };
