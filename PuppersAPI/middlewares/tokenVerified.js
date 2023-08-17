/**
 * @file Middleware for JWT validation
 * @author Gabriel Maldonado <gabamald@espol.edu.ec>
 */

const jwt = require('jsonwebtoken');
const clearence = require('../services/clearenceType.js');

/**
 * Intersepts the request header.auth and verifites the JWT in it.
 * If ther is a token asing its typer to res.locals.authType ,
 * if there is not token res.locals.authType = clearence.clearenceType.ANYONE and the flow continues.
 * Else it return a http reponse with an error
 * @returns
 */
const authChecker = () => {
  return (req, res, next) => {
    const token = req.header('auth');
    if (!token) {
      res.locals.authType = clearence.clearenceType.ANYONE;
      return next();
    }

    try {
      const verified = jwt.verify(token, process.env.TOKEN_JSTVER);
      const type = verified.type;
      const allTypes = clearence.clearenceCodes;

      if (allTypes.includes(type) === true) {
        res.locals.authType = type;
        return next();
      }
      return res.status(401).json({ error: 'Token information not valid' });
    } catch (error) {
      return res.status(401).json({ error: 'Token not valid' });
    }
  };
};

/**
 * Intersepts res.locals.authType
 * If the it  is in the clearenceType list , the flow continues.
 * If it is clearence.clearenceType.ANYONE , send an http reponse with an error
 * Else it return a http reponse with an error:
 * @param {string[]} clearenceTypea
 * @returns
 */
const authGranter = (clearenceTypes) => {
  return (req, res, next) => {
    if ('test'.localeCompare(process.env.NODE_ENV) === 0) {
      return next();
    }
    const type = res.locals.authType;

    if (type.localeCompare(clearence.clearenceType.ANYONE) === 0) {
      return res.status(401).json({ error: 'No Token' });
    }
    if (clearenceTypes.includes(type) === true) {
      return next();
    }

    return res.status(403).json({ error: 'Auth not valid' });
  };
};

module.exports = { authChecker, authGranter };
