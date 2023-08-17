'use strict';

const data = require('../test/test_data/area.json');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('area',
      data
      , {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('area', null, {});
  }
};
