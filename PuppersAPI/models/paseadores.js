/* eslint-disable func-names */
// eslint-disable-next-line no-unused-vars
const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('paseadores', {
    walker_name: {
      type: DataTypes.STRING(128),
      allowNull: false
    },
    start_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    walker_tel: {
      type: DataTypes.STRING(12),
      allowNull: false
    },
    walker_user: {
      type: DataTypes.STRING(18),
      allowNull: false
    },
    walker_password: {
      type: DataTypes.STRING(64),
      allowNull: false
    },
    walker_address: {
      type: DataTypes.STRING(254),
      allowNull: true
    },
    walker_linkaddress: {
      type: DataTypes.STRING(510),
      allowNull: true
    },
    walker_photoURL: {
      type: DataTypes.STRING(510),
      allowNull: true
    },
    walker_bloodtype: {
      type: DataTypes.STRING(3),
      allowNull: true
    },
    walker_salt: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    walker_ID: {
      type: DataTypes.STRING(10),
      allowNull: false,
      primaryKey: true
    }
  }, {
    sequelize,
    tableName: 'paseadores',
    timestamps: false,
    indexes: [
      {
        name: 'PRIMARY',
        unique: true,
        using: 'BTREE',
        fields: [
          { name: 'walker_ID' }
        ]
      }
    ]
  });
};
