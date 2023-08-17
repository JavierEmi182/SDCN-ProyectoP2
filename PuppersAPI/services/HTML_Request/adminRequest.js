/* eslint-disable camelcase */
/**
 * @file Methods for HTTP handling requests to "admin" table
 * @author Gabriel Maldonado <gabamald@espol.edu.ec>
 */

'use strict';

const jwt = require('jsonwebtoken');

const Admin = require('../../models').admin;

const adminVerification = require('../Verification/adminVerification.js');
const passwordSecurity = require('../passwordSecurity.js');
const clearenceType = require('../clearenceType.js').clearenceType;

module.exports = class adminRequest {
  static getAll (req, res, next) {
    Admin.findAll({
      attributes: { exclude: ['admin_password', 'admin_salt'] }
    })
      .then(admins => {
        return res.status(200).json(admins);
      })
      .catch(error => { return res.status(400).send(error); });
  }

  static async add (req, res, next) {
    const { admin_username, admin_password } = req.body;

    const check = await adminVerification.checkUser(admin_username);

    if (!check) {
      const adminSalt = passwordSecurity.getRandomString(20);

      Admin.create({
        admin_username,
        admin_salt: adminSalt,
        admin_password: passwordSecurity.hash(admin_password.concat(adminSalt))
      })
        .then(admins => {
          const token = jwt.sign({
            user: admin_username,
            type: clearenceType.ADMIN
          },
          process.env.TOKEN_JSTVER, { expiresIn: '1h' }
          );

          return res.status(201).json({ token });
        })
        .catch(() => { return res.status(400).send({ error: 'Unable to add' }); });
    } else {
      return res.status(409).json({ error: 'User not valid' });
    }
  }

  static async updateCredentials (req, res, next) {
    const { admin_username, admin_password, new_user, new_password } = req.body;

    if ((await adminVerification.checkCredentials(admin_username, admin_password)) === false) {
      return res.status(409).json({ error: 'Credentials not valid' });
    }

    const inUse = (await adminVerification.checkUser(new_user)) && !(new_user.localeCompare(admin_username) === 0);
    if (inUse) {
      return res.status(409).json({ error: 'New user not valid' });
    }

    const admin = await adminVerification.getUser(admin_username);
    const admin_salt = admin.admin_salt;
    const newSalt = passwordSecurity.getRandomString(20);

    Admin.update({
      admin_username: new_user,
      admin_password: passwordSecurity.hash(new_password.concat(newSalt)),
      admin_salt: newSalt
    },
    {
      where: {
        admin_username,
        admin_password: passwordSecurity.hash(admin_password.concat(admin_salt))
      },
      returning: true,
      plain: true
    })
      .then(response => {
        if (response[1] === 1) {
          return res.status(201).json({ user: new_user });
        }
        return res.status(404).json({ error: 'No data has been update' });
      })
      .catch(() => { return res.status(400).send({ error: 'Unable to update' }); });
  }

  static log (req, res, next) {
    const { admin_username, admin_password } = req.body;

    adminVerification.checkCredentials(admin_username, admin_password)
      .then(check => {
        if (check) {
          const token = jwt.sign({
            user: admin_username,
            type: clearenceType.ADMIN
          },
          process.env.TOKEN_JSTVER, { expiresIn: '1h' }
          );
          return res.status(200).json({ token });
        }
        return res.status(404).json({ error: 'Data not valid' });
      })
      .catch(error => {
        return res.status(400).json(error);
      });
  }

  static delete (req, res, next) {
    const adminUsername = req.params.admin_username;

    Admin.destroy({
      where: {
        admin_username: adminUsername
      }
    })
      .then(respuesta => {
        if (respuesta === 1) {
          return res.status(200).json(1);
        }
        return res.status(404).json(0);
      })
      .catch(() => { return res.status(400).send({ error: 'Unable to delete' }); });
  }
};
