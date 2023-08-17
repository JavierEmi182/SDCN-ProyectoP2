/* eslint-disable no-eq-null */
'use strict';
/**
 * @file Middleware for Joi.Object schema validation
 * @author Gabriel Maldonado <gabamald@espol.edu.ec>
 */

/**
 * Recives a Joi.Object schema with the struture and validations of the spected content
 *  in the property of an http reques. The schema is validated and the flow continues
 *  if it pass all validations or return a http reponse with error  422 if not
 * @param {Joi.object} schema schema with the struture and validations
 * @param {string} property property of an html request (Ex: body, param , query)
 * @returns
 */
const validator = (schema, property) => {
  return (req, res, next) => {
    const { error } = schema.validate(req[property], { abortEarly: false });
    const valid = (error == null);

    if (valid) {
      return next();
    }
    const { details } = error;
    const message = details.map(i => { return i.message; }).join(',');
    return res.status(422).json({ error: message });
  };
};

module.exports = validator;
