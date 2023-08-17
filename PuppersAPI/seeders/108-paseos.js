'use strict';

const Servicio = require('../models').servicio;
const FranjaHoraria = require('../models').franjahoraria;

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const servicios = await Servicio.findAll();

    const currentDate = new Date();

    for (let i = 0; i < servicios.length; i++) {
      const franja = await FranjaHoraria.findAll({
        where: {
          franja_id: servicios[i].franja_id
        }
      });
      const hora = Math.floor(franja[0].start_minute / 60);
      currentDate.setUTCHours(hora, 0, 0);

      await queryInterface.bulkInsert('paseo', [
        {
          walker_ID: servicios[i].walker_ID,
          servicio_ID: servicios[i].servicio_ID,
          start_date: currentDate
        }], {});
    }
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('paseo', null, {});
  }
};
