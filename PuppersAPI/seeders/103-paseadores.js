'use strict';

const passwordSecurity = require('../services/passwordSecurity.js');

const data = require('../test/test_data/paseadores.json');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    for (let i = 0; i < data.length; i++) {
      const walkerSalt = passwordSecurity.getRandomString(20);

      await queryInterface.bulkInsert('paseadores', [
        {
          walker_name: data[i].walker_name,
          start_date: data[i].start_date,
          walker_tel: data[i].walker_tel,
          walker_user: data[i].walker_user,
          walker_password: passwordSecurity.hash(data[i].walker_password.concat(walkerSalt)),
          walker_address: data[i].walker_address,
          walker_linkaddress: data[i].walker_linkaddress,
          walker_photoURL: data[i].walker_photoURL,
          walker_salt: walkerSalt,
          walker_bloodtype: data[i].walker_bloodtype,
          walker_ID: data[i].walker_ID

        }], {});
    }
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('paseadores', null, {});
  }
};
