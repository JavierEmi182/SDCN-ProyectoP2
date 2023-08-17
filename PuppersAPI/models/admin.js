/* eslint-disable func-names */
// eslint-disable-next-line no-unused-vars
const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('admin', {
    admin_username: {
      type: DataTypes.STRING(18),
      allowNull: false,
      primaryKey: true
    },
    admin_password: {
      type: DataTypes.STRING(64),
      allowNull: true
    },
    admin_salt: {
      type: DataTypes.STRING(20),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'admin',
    timestamps: false,
    indexes: [
      {
        name: 'PRIMARY',
        unique: true,
        using: 'BTREE',
        fields: [
          { name: 'admin_username' }
        ]
      }
    ]
  });
};
