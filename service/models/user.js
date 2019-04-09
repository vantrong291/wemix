'use strict';
module.exports = function(sequelize, Sequelize) {
  const User = sequelize.define('user', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    token: {
      type: Sequelize.STRING(50),
      allowNull: false,
      unique: true,
    }
  }, {
    timestamps: false
  });
  User.associate = function(models) {
    User.belongsTo(models.group, {
      foreignKey: "group",
      as: "Group"
    });
    User.hasMany(models.playlist, {
      foreignKey: "belong_to_user",
      as: "Playlist"
    });
    User.hasMany(models.favourite_track, {
      foreignKey: "belong_to_user",
      as: "FavouriteTrack"
    });

  };
  return User;
};