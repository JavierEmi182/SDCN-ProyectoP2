'use strict';

const Area = require('../models').area;

const data = require('../test/test_data/location.json');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const areas = await Area.findAll();

    for (let i = 0; i < data.length; i++) {
      const areaIndex = Math.floor(Math.random() * areas.length);

      await queryInterface.bulkInsert('location', [
        {
          location_name: data[i].location_name,
          area_id: areas[areaIndex].area_id
        }], {});
    }
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('location', null, {});
  }
};
