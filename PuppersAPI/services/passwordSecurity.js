/**
 * @file Functions securit of password for all tables
 * @author Gabriel Maldonado <gabamald@espol.edu.ec>
 */

'use strict';

const { createHash } = require('crypto');
const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

/**
 * Generetes a random string the length pass by parameter
 * @param {number} length - length of the string
 * @returns {string} random string
 */
function getRandomString (length) {
  let random = '';
  const charactersLength = characters.length;

  for (let i = 0; i < length; i++) {
    random += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return random;
}

function hash (string) {
  return createHash('sha256').update(string).digest('hex');
}

module.exports = { getRandomString, hash };
