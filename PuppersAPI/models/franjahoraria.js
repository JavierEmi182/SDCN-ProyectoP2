/* eslint-disable func-names */
// eslint-disable-next-line no-unused-vars
const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('franjahoraria', {
    franja_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    start_minute: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    end_minute: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    convertido: {
      type: DataTypes.STRING(11),
      allowNull: true,
      unique: 'convertido'
    }
  }, {
    sequelize,
    tableName: 'franjaHoraria',
    timestamps: false,
    indexes: [
      {
        name: 'PRIMARY',
        unique: true,
        using: 'BTREE',
        fields: [
          { name: 'franja_id' }
        ]
      },
      {
        name: 'convertido',
        unique: true,
        using: 'BTREE',
        fields: [
          { name: 'convertido' }
        ]
      }
    ]
  });
};
