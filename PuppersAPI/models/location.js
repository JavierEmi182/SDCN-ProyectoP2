/* eslint-disable func-names */
// eslint-disable-next-line no-unused-vars
const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('location', {
    location_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    location_name: {
      type: DataTypes.STRING(255),
      allowNull: true,
      unique: 'location_name'
    },
    area_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'area',
        key: 'area_id'
      }
    }
  }, {
    sequelize,
    tableName: 'location',
    timestamps: false,
    indexes: [
      {
        name: 'PRIMARY',
        unique: true,
        using: 'BTREE',
        fields: [
          { name: 'location_id' },
          { name: 'area_id' }
        ]
      },
      {
        name: 'location_name',
        unique: true,
        using: 'BTREE',
        fields: [
          { name: 'location_name' }
        ]
      },
      {
        name: 'area_id',
        using: 'BTREE',
        fields: [
          { name: 'area_id' }
        ]
      }
    ]
  });
};
