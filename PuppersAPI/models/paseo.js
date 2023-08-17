/* eslint-disable func-names */
// eslint-disable-next-line no-unused-vars
const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('paseo', {
    paseo_ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    walker_ID: {
      type: DataTypes.STRING(10),
      allowNull: true,
      references: {
        model: 'paseadores',
        key: 'walker_ID'
      }
    },
    servicio_ID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'servicio',
        key: 'servicio_ID'
      }
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    end_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    evidenceURL: {
      type: DataTypes.STRING(510),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'paseo',
    timestamps: false,
    indexes: [
      {
        name: 'PRIMARY',
        unique: true,
        using: 'BTREE',
        fields: [
          { name: 'paseo_ID' }
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
          { name: 'servicio_ID' }
        ]
      }
    ]
  });
};
