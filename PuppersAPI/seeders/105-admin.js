'use strict';

const passwordSecurity = require('../services/passwordSecurity.js');

const data = [{ admin_username: 'superUser', admin_password: 'A48po_poi' },
  { admin_username: 'testUser1', admin_password: 'h8mm9_@w8R+)' },
  { admin_username: 'testUser2', admin_password: 'YCzkgUv[;,2Y' },
  { admin_username: 'testUser3', admin_password: 'aaaaa[;,2Y' },
  { admin_username: 'testUser9', admin_password: 'A158Kyetr' },
  { admin_username: 'testUser8', admin_password: 'ase[@w8R+25' }];
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    for (let i = 0; i < data.length; i++) {
      const adminSalt = passwordSecurity.getRandomString(20);

      await queryInterface.bulkInsert('admin', [
        {
          admin_username: data[i].admin_username,
          admin_password: passwordSecurity.hash(data[i].admin_password.concat(adminSalt)),
          admin_salt: adminSalt
        }], {});
    }
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('admin', null, {});
  }
};
