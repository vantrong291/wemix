'use strict';
module.exports = function(sequelize, Sequelize) {
  const FavouriteTrack = sequelize.define('favourite_track', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    track: {
      type: Sequelize.TEXT,
      allowNull: false,
    }
  });
  FavouriteTrack.associate = function(models) {
    FavouriteTrack.belongsTo(models.user, {
      foreignKey: "belong_to_user",
      as: "User"
    })
  };
  return FavouriteTrack;
};