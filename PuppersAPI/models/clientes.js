/* eslint-disable func-names */
// eslint-disable-next-line no-unused-vars
const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('clientes', {
    client_tel: {
      type: DataTypes.STRING(12),
      allowNull: true
    },
    client_ID: {
      type: DataTypes.STRING(10),
      allowNull: false,
      primaryKey: true
    },
    client_name: {
      type: DataTypes.STRING(128),
      allowNull: false
    },
    start_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    client_email: {
      type: DataTypes.STRING(254),
      allowNull: true
    },
    client_user: {
      type: DataTypes.STRING(18),
      allowNull: false
    },
    client_password: {
      type: DataTypes.STRING(64),
      allowNull: true
    },
    client_salt: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    location_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'location',
        key: 'location_id'
      }
    },
    address_link: {
      type: DataTypes.STRING(510),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'clientes',
    timestamps: false,
    indexes: [
      {
        name: 'PRIMARY',
        unique: true,
        using: 'BTREE',
        fields: [
          { name: 'client_ID' }
        ]
      },
      {
        name: 'FK2',
        using: 'BTREE',
        fields: [
          { name: 'location_id' }
        ]
      },
      {
        name: 'idx_client_ID',
        using: 'BTREE',
        fields: [
          { name: 'client_ID' }
        ]
      }
    ]
  });
};
