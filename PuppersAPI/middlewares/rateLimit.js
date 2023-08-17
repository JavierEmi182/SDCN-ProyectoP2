const RateLimit = require('express-rate-limit');

const clearenceType = require('../services/clearenceType.js');

const highLimit = ('test'.localeCompare(process.env.NODE_ENV) === 0) ? 100 : 40;
const midLimit = ('test'.localeCompare(process.env.NODE_ENV) === 0) ? 100 : 30;
const lowLimit = ('test'.localeCompare(process.env.NODE_ENV) === 0) ? 100 : 25;

const logLimit = ('test'.localeCompare(process.env.NODE_ENV) === 0) ? 100 : 10;
const addLimit = ('test'.localeCompare(process.env.NODE_ENV) === 0) ? 100 : 8;
const updateLimit = ('test'.localeCompare(process.env.NODE_ENV) === 0) ? 100 : 5;
const deleteLimit = ('test'.localeCompare(process.env.NODE_ENV) === 0) ? 100 : 4;

const generalLimiter = RateLimit({

  windowMs: 1 * 60 * 1000,
  max: async (req, res) => {
    const type = res.locals.authType;
    return clearenceType.clearenceLimits[type];
  },
  message: 'Total number of reques has exede expected rate',
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res, next, options) => { return res.status(options.statusCode).send({ error: options.message }); }

});

const highLimiter = RateLimit({
  windowMs: 1 * 60 * 1000,
  max: highLimit,
  message: 'Number of reques has exede expected rate',
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res, next, options) => { return res.status(options.statusCode).send({ error: options.message }); }

});

const midLimiter = RateLimit({
  windowMs: 1 * 60 * 1000,
  max: midLimit,
  message: 'Number of reques has exede expected rate',
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res, next, options) => { return res.status(options.statusCode).send({ error: options.message }); }

});

const lowLimiter = RateLimit({
  windowMs: 1 * 60 * 1000,
  max: lowLimit,
  message: 'Number of reques has exede expected rate',
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res, next, options) => { return res.status(options.statusCode).send({ error: options.message }); }

});

const otherLimiter = RateLimit({
  windowMs: 60 * 60 * 1000,
  max: 4,
  message: 'Number of reques has exede expected rate',
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res, next, options) => { return res.status(options.statusCode).send({ error: options.message }); }

});

const logLimiter = RateLimit({
  windowMs: 5 * 60 * 1000,
  max: logLimit,
  message: 'Log rate limit exede. Please wait max 5 min',
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res, next, options) => { return res.status(options.statusCode).send({ error: options.message }); }

});

const addLimiter = RateLimit({
  windowMs: 1 * 60 * 1000,
  max: addLimit,
  message: 'Number of reques has exede expected rate',
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res, next, options) => { return res.status(options.statusCode).send({ error: options.message }); }
});

const updateLimiter = RateLimit({
  windowMs: 1 * 60 * 1000,
  max: updateLimit,
  message: 'Number of reques has exede expected rate',
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res, next, options) => { return res.status(options.statusCode).send({ error: options.message }); }
});

const deleteLimiter = RateLimit({
  windowMs: 1 * 60 * 1000,
  max: deleteLimit,
  message: 'Number of reques has exede expected rate',
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res, next, options) => { return res.status(options.statusCode).send({ error: options.message }); }
});

const authUpdateLimiter = RateLimit({
  windowMs: 60 * 60 * 1000,
  max: updateLimit,
  message: 'Credential can just be change once per hour',
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res, next, options) => { return res.status(options.statusCode).send({ error: options.message }); }

});

module.exports = { generalLimiter, highLimiter, midLimiter, lowLimiter, otherLimiter, authUpdateLimiter, logLimiter, addLimiter, updateLimiter, deleteLimiter };
