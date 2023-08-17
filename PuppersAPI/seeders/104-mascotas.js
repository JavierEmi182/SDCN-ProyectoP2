'use strict';

const data = require('../test/test_data/mascota.json');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('mascotas', data, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('mascotas', null, {});
  }
};
