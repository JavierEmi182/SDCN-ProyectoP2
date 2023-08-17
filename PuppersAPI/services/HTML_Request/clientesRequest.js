/* eslint-disable camelcase */
/**
 * @file Methods for HTTP handling requests to "clientes" table
 * @author Gabriel Maldonado <gabamald@espol.edu.ec>
 */

'use strict';

const jwt = require('jsonwebtoken');

const Cliente = require('../../models').clientes;

const clientesVerification = require('../Verification/clientesVerification.js');
const clearenceType = require('../clearenceType.js').clearenceType;
const passwordSecurity = require('../passwordSecurity.js');

module.exports = class clientesRequest {
  static allClients (req, res, next) {
    Cliente.findAll({
      attributes: { exclude: ['client_password', 'client_salt'] }
    })
      .then(clientes => {
        return res.status(200).json(clientes);
      })
      .catch(error => { return res.status(400).send(error); });
  }

  static getClient (req, res, next) {
    const clientID = req.params.client_ID;

    Cliente.findAll({
      attributes: { exclude: ['client_password', 'client_salt'] },
      where: {
        client_ID: clientID
      }
    })
      .then(clientes => {
        return res.status(200).json(clientes);
      })
      .catch(error => { return res.status(400).send(error); });
  }

  static async addClient (req, res, next) {
    const {
      client_tel, client_ID, client_name, start_date, client_email, client_user,
      client_password, location_id, address_link
    } = req.body;

    const check = await clientesVerification.checkUser(client_user);

    if (!check) {
      const clientSalt = passwordSecurity.getRandomString(20);

      Cliente.create({
        client_tel,
        client_ID,
        client_name,
        start_date: Date.parse(start_date),
        client_email,
        client_user,
        client_salt: clientSalt,
        client_password: passwordSecurity.hash(client_password.concat(clientSalt)),
        location_id,
        address_link
      })
        .then(clientes => {
          const token = jwt.sign({
            user: client_user,
            type: clearenceType.CLIENTE
          },
          process.env.TOKEN_JSTVER, { expiresIn: '1h' }
          );

          return res.status(201).json({ token, client_ID });
        })
        .catch(() => { return res.status(400).send({ error: 'Unable to add' }); });
    } else {
      return res.status(409).json({ error: 'User not valid' });
    }
  }

  static updateClient (req, res, next) {
    const {
      client_tel, client_ID, client_name, start_date, client_email,
      location_id, address_link
    } = req.body;

    Cliente.update({
      client_tel,
      client_name,
      start_date: Date.parse(start_date),
      client_email,
      location_id,
      address_link
    },
    {
      where: {
        client_ID
      },
      returning: true,
      plain: true
    })
      .then(response => {
        if (response[1] === 1) {
          return res.status(201).json({ client_ID });
        }
        return res.status(404).json({ error: 'No data has been update' });
      })
      .catch(() => { return res.status(400).send({ error: 'Unable to update' }); });
  }

  static async updateClientCredentials (req, res, next) {
    const { client_user, client_password, new_user, new_password } = req.body;

    if ((await clientesVerification.checkCredentials(client_user, client_password)) === false) {
      return res.status(409).json({ error: 'Credentials not valid' });
    }

    const inUse = (await clientesVerification.checkUser(new_user)) && !(new_user.localeCompare(client_user) === 0);
    if (inUse) {
      return res.status(409).json({ error: 'New user not valid' });
    }

    const cliente = await clientesVerification.getUser(client_user);
    const clientSalt = cliente.client_salt;
    const newSalt = passwordSecurity.getRandomString(20);

    Cliente.update({
      client_user: new_user,
      client_password: passwordSecurity.hash(new_password.concat(newSalt)),
      client_salt: newSalt
    },
    {
      where: {
        client_user,
        client_password: passwordSecurity.hash(client_password.concat(clientSalt))
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
    const clientID = req.body.client_ID;
    const newSalt = passwordSecurity.getRandomString(20);

    Cliente.update({
      client_password: passwordSecurity.hash(clientID.concat(newSalt)),
      client_salt: newSalt
    },
    {
      where: {
        client_ID: clientID
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

  static async logClient (req, res, next) {
    const { client_user, client_password } = req.body;
    clientesVerification.checkCredentials(client_user, client_password)
      .then(async check => {
        if (check) {
          const token = jwt.sign({
            user: client_user,
            type: clearenceType.CLIENTE
          },
          process.env.TOKEN_JSTVER, { expiresIn: '1h' }
          );
          const cliente = await clientesVerification.getUser(client_user);

          return res.status(200).json({ token, client_ID: cliente.client_ID });
        }
        return res.status(404).json({ error: 'Data not valid' });
      })
      .catch(error => {
        return res.status(400).json(error);
      });
  }

  static deleteClient (req, res, next) {
    const clientID = req.params.client_ID;

    Cliente.destroy({
      where: {
        client_ID: clientID
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
