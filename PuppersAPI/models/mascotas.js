/* eslint-disable func-names */
// eslint-disable-next-line no-unused-vars
const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('mascotas', {
    pet_token: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    client_ID: {
      type: DataTypes.STRING(10),
      allowNull: true,
      references: {
        model: 'clientes',
        key: 'client_ID'
      }
    },
    pet_name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    service: {
      type: DataTypes.STRING(2),
      allowNull: true,
      defaultValue: '5P'
    },
    renovation_date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      defaultValue: '2023-12-31'
    },
    pet_breed: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: 'mixed'
    }
  }, {
    sequelize,
    tableName: 'mascotas',
    timestamps: false,
    indexes: [
      {
        name: 'PRIMARY',
        unique: true,
        using: 'BTREE',
        fields: [
          { name: 'pet_token' }
        ]
      },
      {
        name: 'client_ID',
        using: 'BTREE',
        fields: [
          { name: 'client_ID' }
        ]
      }
    ]
  });
};
