'use strict';
module.exports = function(sequelize, Sequelize) {
  const Playlist = sequelize.define('playlist', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    name: {
      type: Sequelize.STRING(50),
      allowNull: false,
      unique: true,
    },
    tracks: {
      type: Sequelize.TEXT,
      allowNull: false,
    }
  });
  Playlist.associate = function(models) {
    Playlist.belongsTo(models.user, {
      foreignKey: "belong_to_user",
      as: "User"
    })
  };
  return Playlist;
};