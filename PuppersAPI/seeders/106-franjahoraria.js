'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('franjaHoraria',
      [{ start_minute: 420, end_minute: 480, convertido: '7:00-8:00' },
        { start_minute: 480, end_minute: 540, convertido: '8:00-9:00' },
        { start_minute: 540, end_minute: 600, convertido: '9:00-10:00' },
        { start_minute: 600, end_minute: 660, convertido: '10:00-11:00' },
        { start_minute: 660, end_minute: 720, convertido: '11:00-12:00' },
        { start_minute: 720, end_minute: 780, convertido: '12:00-13:00' },
        { start_minute: 780, end_minute: 840, convertido: '13:00-14:00' },
        { start_minute: 840, end_minute: 900, convertido: '14:00-15:00' },
        { start_minute: 900, end_minute: 960, convertido: '15:00-16:00' },
        { start_minute: 960, end_minute: 1020, convertido: '16:00-17:00' },
        { start_minute: 1020, end_minute: 1080, convertido: '17:00-18:00' },
        { start_minute: 1080, end_minute: 1140, convertido: '18:00-19:00' },
        { start_minute: 1140, end_minute: 1200, convertido: '19:00-20:00' }]
      , {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('franjaHoraria', null, {});
  }
};
