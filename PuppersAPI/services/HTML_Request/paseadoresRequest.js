/* eslint-disable camelcase */
/**
 * @file Methods for HTTP handling requests to "paseadores" table
 * @author Gabriel Maldonado <gabamald@espol.edu.ec>
 */

'use strict';

const jwt = require('jsonwebtoken');

const Paseadores = require('../../models').paseadores;

const paseadoresVerification = require('../Verification/paseadoresVerification.js');
const clearenceType = require('../clearenceType.js').clearenceType;
const passwordSecurity = require('../passwordSecurity.js');

module.exports = class paseadoresRequest {
  static allWalkers (req, res, next) {
    Paseadores.findAll({
      attributes: { exclude: ['walker_password', 'walker_salt'] }
    })
      .then(paseadores => {
        return res.status(200).json(paseadores);
      })
      .catch(error => { return res.status(400).send(error); });
  }

  static getWalkers (req, res, next) {
    const walkerID = req.params.walker_ID;

    Paseadores.findAll({
      attributes: { exclude: ['walker_password', 'walker_salt'] },
      where: {
        walker_ID: walkerID
      }
    })
      .then(paseadores => {
        return res.status(200).json(paseadores);
      })
      .catch(error => { return res.status(400).send(error); });
  }

  static async addWalker (req, res, next) {
    const {
      walker_name, start_date, walker_tel, walker_user, walker_password,
      walker_address, walker_linkaddress, walker_photoURL, walker_bloodtype, walker_ID
    } = req.body;

    const check = await paseadoresVerification.checkUser(walker_user);

    if (!check) {
      const walkertSalt = passwordSecurity.getRandomString(20);

      Paseadores.create({
        walker_ID,
        walker_tel,
        walker_name,
        start_date: Date.parse(start_date),
        walker_user,
        walker_salt: walkertSalt,
        walker_password: passwordSecurity.hash(walker_password.concat(walkertSalt)),
        walker_address,
        walker_linkaddress,
        walker_photoURL,
        walker_bloodtype

      })
        .then(paseadores => {
          const token = jwt.sign({
            user: walker_user,
            type: clearenceType.PASEADOR
          },
          process.env.TOKEN_JSTVER, { expiresIn: '1h' }
          );

          return res.status(201).json({ token, walker_ID });
        })
        .catch(() => { return res.status(400).send({ error: 'Unable to add' }); });
    } else {
      return res.status(409).json({ error: 'User not valid' });
    }
  }

  static updateWalker (req, res, next) {
    const {
      walker_ID, walker_tel, walker_name, start_date, walker_address,
      walker_linkaddress, walker_photoURL, walker_bloodtype
    } = req.body;

    Paseadores.update({
      walker_tel,
      walker_name,
      start_date: Date.parse(start_date),
      walker_address,
      walker_linkaddress,
      walker_photoURL,
      walker_bloodtype

    },
    {
      where: {
        walker_ID
      },
      returning: true,
      plain: true
    })
      .then(response => {
        if (response[1] === 1) {
          return res.status(201).json({ walker_ID });
        }
        return res.status(404).json({ error: 'No data has been update' });
      })
      .catch(() => { return res.status(400).send({ error: 'Unable to update' }); });
  }

  static async updateWalkerCredentials (req, res, next) {
    const { walker_user, walker_password, new_user, new_password } = req.body;

    if ((await paseadoresVerification.checkCredentials(walker_user, walker_password)) === false) {
      return res.status(409).json({ error: 'Credentials not valid' });
    }

    const inUse = (await paseadoresVerification.checkUser(new_user)) && !(new_user.localeCompare(walker_user) === 0);
    if (inUse) {
      return res.status(409).json({ error: 'New user not valid' });
    }

    const walker = await paseadoresVerification.getUser(walker_user);
    const walkertSalt = walker.walker_salt;
    const newSalt = passwordSecurity.getRandomString(20);

    Paseadores.update({
      walker_salt: newSalt,
      walker_user: new_user,
      walker_password: passwordSecurity.hash(new_password.concat(newSalt))
    },
    {
      where: {
        walker_user,
        walker_password: passwordSecurity.hash(walker_password.concat(walkertSalt))
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

  static async restore (req, res, next) {
    const walkerID = req.body.walker_ID;
    const newSalt = passwordSecurity.getRandomString(20);

    Paseadores.update({
      walker_password: passwordSecurity.hash(walkerID.concat(newSalt)),
      walker_salt: newSalt
    },
    {
      where: {
        walker_ID: walkerID
      },
      returning: true,
      plain: true
    })
      .then(response => {
        if (response[1] === 1) {
          return res.status(201).json(1);
        }
        return res.status(404).json({ error: 'No data has been update' });
      })
      .catch(() => { return res.status(400).send({ error: 'Unable to update' }); });
  }

  static async logWalker (req, res, next) {
    const { walker_user, walker_password } = req.body;

    paseadoresVerification.checkCredentials(walker_user, walker_password)
      .then(async check => {
        if (check) {
          const token = jwt.sign({
            user: walker_user,
            type: clearenceType.PASEADOR
          },
          process.env.TOKEN_JSTVER, { expiresIn: '1h' }
          );

          const walker = await paseadoresVerification.getUser(walker_user);

          return res.status(200).json({ token, walker_ID: walker.walker_ID });
        }
        return res.status(404).json({ error: 'Data not valid' });
      })
      .catch(error => { return res.status(400).send(error); });
  }

  static deleteWalker (req, res, next) {
    const walkerID = req.params.walker_ID;

    Paseadores.destroy({
      where: {
        walker_ID: walkerID
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
