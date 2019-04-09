'use strict';

const User = require('./user');

module.exports = function(sequelize, Sequelize) {
  const Group = sequelize.define('group', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    name: {
      type: Sequelize.STRING(30),
      allowNull: false,
      unique: true,
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: false,
    }
  }, {
    timestamps: false
  });
  Group.associate = function(models) {
    Group.hasMany(models.user, {
      foreignKey: "group",
      as: "AllUser"
    });
  };
  return Group;
};