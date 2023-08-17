/* eslint-disable func-names */
// eslint-disable-next-line no-unused-vars
const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('servicio', {
    servicio_ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    pet_token: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'mascotas',
        key: 'pet_token'
      }
    },
    walker_ID: {
      type: DataTypes.STRING(10),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'paseadores',
        key: 'walker_ID'
      }
    },
    franja_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'franjahoraria',
        key: 'franja_id'
      }
    }
  }, {
    sequelize,
    tableName: 'servicio',
    timestamps: false,
    indexes: [
      {
        name: 'PRIMARY',
        unique: true,
        using: 'BTREE',
        fields: [
          { name: 'servicio_ID' },
          { name: 'pet_token' },
          { name: 'walker_ID' },
          { name: 'franja_id' }
        ]
      },
      {
        name: 'fk1',
        using: 'BTREE',
        fields: [
          { name: 'pet_token' }
        ]
      },
      {
        name: 'fk2',
        using: 'BTREE',
        fields: [
          { name: 'walker_ID' }
        ]
      },
      {
        name: 'fk3',
        using: 'BTREE',
        fields: [
          { name: 'franja_id' }
        ]
      }
    ]
  });
};
