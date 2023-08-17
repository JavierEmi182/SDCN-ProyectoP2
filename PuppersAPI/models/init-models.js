const DataTypes = require('sequelize').DataTypes;
const _admin = require('./admin');
const _area = require('./area');
const _clientes = require('./clientes');
const _franjahoraria = require('./franjahoraria');
const _location = require('./location');
const _mascotas = require('./mascotas');
const _paseadores = require('./paseadores');
const _paseo = require('./paseo');
const _servicio = require('./servicio');

function initModels (sequelize) {
  const admin = _admin(sequelize, DataTypes);
  const area = _area(sequelize, DataTypes);
  const clientes = _clientes(sequelize, DataTypes);
  const franjahoraria = _franjahoraria(sequelize, DataTypes);
  const location = _location(sequelize, DataTypes);
  const mascotas = _mascotas(sequelize, DataTypes);
  const paseadores = _paseadores(sequelize, DataTypes);
  const paseo = _paseo(sequelize, DataTypes);
  const servicio = _servicio(sequelize, DataTypes);

  location.belongsTo(area, { as: 'area', foreignKey: 'area_id' });
  area.hasMany(location, { as: 'locations', foreignKey: 'area_id' });
  mascotas.belongsTo(clientes, { as: 'client', foreignKey: 'client_ID' });
  clientes.hasMany(mascotas, { as: 'mascota', foreignKey: 'client_ID' });
  servicio.belongsTo(franjahoraria, { as: 'franja', foreignKey: 'franja_id' });
  franjahoraria.hasMany(servicio, { as: 'servicios', foreignKey: 'franja_id' });
  clientes.belongsTo(location, { as: 'location', foreignKey: 'location_id' });
  location.hasMany(clientes, { as: 'clientes', foreignKey: 'location_id' });
  servicio.belongsTo(mascotas, { as: 'pet_token_mascota', foreignKey: 'pet_token' });
  mascotas.hasMany(servicio, { as: 'servicios', foreignKey: 'pet_token' });
  paseo.belongsTo(paseadores, { as: 'walker', foreignKey: 'walker_ID' });
  paseadores.hasMany(paseo, { as: 'paseos', foreignKey: 'walker_ID' });
  servicio.belongsTo(paseadores, { as: 'walker', foreignKey: 'walker_ID' });
  paseadores.hasMany(servicio, { as: 'servicios', foreignKey: 'walker_ID' });
  paseo.belongsTo(servicio, { as: 'servicio', foreignKey: 'servicio_ID' });
  servicio.hasMany(paseo, { as: 'paseos', foreignKey: 'servicio_ID' });

  return {
    admin,
    area,
    clientes,
    franjahoraria,
    location,
    mascotas,
    paseadores,
    paseo,
    servicio
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
