'use strict';

const Mascotas = require('../models').mascotas;
const FranjaHoraria = require('../models').franjahoraria;
const Paseadores = require('../models').paseadores;

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const mascotas = await Mascotas.findAll();
    const franja = await FranjaHoraria.findAll();
    const paseador = await Paseadores.findAll();

    for (let i = 0; i < 40; i++) {
      const franjaIndex = Math.floor(Math.random() * franja.length);
      const paseadorIndex = Math.floor(Math.random() * paseador.length);

      await queryInterface.bulkInsert('servicio', [
        {
          pet_token: mascotas[i].pet_token,
          walker_ID: paseador[paseadorIndex].walker_ID,
          franja_id: franja[franjaIndex].franja_id
        }], {});
    }
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('servicio', null, {});
  }
};
