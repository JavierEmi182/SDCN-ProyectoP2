/* eslint-disable func-names */
// eslint-disable-next-line no-unused-vars
const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('area', {
    area_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    area_name: {
      type: DataTypes.STRING(255),
      allowNull: true,
      unique: 'area_name'
    }
  }, {
    sequelize,
    tableName: 'area',
    timestamps: false,
    indexes: [
      {
        name: 'PRIMARY',
        unique: true,
        using: 'BTREE',
        fields: [
          { name: 'area_id' }
        ]
      },
      {
        name: 'area_name',
        unique: true,
        using: 'BTREE',
        fields: [
          { name: 'area_name' }
        ]
      }
    ]
  });
};
