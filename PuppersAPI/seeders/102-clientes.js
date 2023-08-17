'use strict';

const passwordSecurity = require('../services/passwordSecurity.js');
const Location = require('../models').location;

const data = require('../test/test_data/clientes.json');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const locations = await Location.findAll();

    for (let i = 0; i < data.length; i++) {
      const clientSalt = passwordSecurity.getRandomString(20);
      const locationsIndex = Math.floor(Math.random() * locations.length);

      await queryInterface.bulkInsert('clientes', [
        {
          client_tel: data[i].client_tel,
          client_ID: data[i].client_id,
          client_name: data[i].client_name,
          start_date: data[i].start_date,
          client_email: data[i].client_email,
          client_user: data[i].client_user,
          client_password: passwordSecurity.hash(data[i].client_password.concat(clientSalt)),
          client_salt: clientSalt,
          location_id: locations[locationsIndex].location_id,
          address_link: data[i].address_link
        }], {});
    }
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('clientes', null, {});
  }
};
