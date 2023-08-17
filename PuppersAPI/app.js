/**
 * @author Gabriel Maldonado <gabamald@espol.edu.ec>
 */

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const helmet = require('helmet');
const rateLimit = require('./middlewares/rateLimit.js');
const tokenVerified = require('./middlewares/tokenVerified.js');

require('dotenv').config();

const indexRouter = require('./routes/index');

const areaRestRoute = require('./rest/area');
const locationRestRoute = require('./rest/location');
const franjaRestRoute = require('./rest/franjahoraria');

const clientesRestRoute = require('./rest/clientes');
const paseadoresRestRoute = require('./rest/paseadores');
const mascotasRestRoute = require('./rest/mascotas');
const adminRestRoute = require('./rest/admin');

const servicioRestRoute = require('./rest/servicio');
const paseoRestRoute = require('./rest/paseo');

const mascotasQueriesRoute = require('./rest/queriesMascotas');

const app = express();

app.use(cors());
app.use(
  helmet({
    contentSecurityPolicy: { directives: { 'script-src': "'self'" } },
    crossOriginOpenerPolicy: { policy: 'same-origin' },
    crossOriginResourcePolicy: { policy: 'cross-origin' },
    referrerPolicy: { policy: 'no-referrer' },
    strictTransportSecurity: {
      maxAge: 123456,
      includeSubDomains: true
    },
    xFrameOptions: { action: 'deny' }

  })
);
app.disable('x-powered-by');
app.use(compression());

app.use(tokenVerified.authChecker());

if ('test'.localeCompare(process.env.NODE_ENV) !== 0) {
  app.use(rateLimit.generalLimiter);
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('port', process.env.PORT || 3000);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

app.use('/areas', rateLimit.highLimiter, areaRestRoute);
app.use('/locations', rateLimit.highLimiter, locationRestRoute);
app.use('/franjaHoraria', rateLimit.highLimiter, franjaRestRoute);

app.use('/clientes', rateLimit.lowLimiter, clientesRestRoute);
app.use('/paseadores', rateLimit.lowLimiter, paseadoresRestRoute);
app.use('/admin', rateLimit.lowLimiter, adminRestRoute);

app.use('/mascotas', rateLimit.highLimiter, mascotasRestRoute);
app.use('/servicios', rateLimit.lowLimiter, servicioRestRoute);
app.use('/paseos', rateLimit.midLimiter, paseoRestRoute);

app.use('/mascotasQueries', rateLimit.highLimiter, mascotasQueriesRoute);

app.use(rateLimit.otherLimiter);

app.get('*', function invalidRoute (req, res) {
  res.status(404).json({ error: 'Page not found' });
});

app.post('*', function invalidRoute (req, res) {
  res.status(404).json({ error: 'Page not found' });
});

app.put('*', function invalidRoute (req, res) {
  res.status(404).json({ error: 'Page not found' });
});

app.delete('*', function invalidRoute (req, res) {
  res.status(404).json({ error: 'Page not found' });
});

// catch 404 and forward to error handler
app.use(function errorHandler (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function errorHandlerDev (err, req, res, next) {
  const message = err.message;
  const error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(500);
  res.json({ error: 'Something Broke', message, trase: error.stack });
});

module.exports = app;
