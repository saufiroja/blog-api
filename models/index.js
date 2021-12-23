const { Users } = require("./Users.model");
const { Feeds } = require("./Feeds.model");

Users.hasMany(Feeds, {
  foreignKey: "userId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

Feeds.belongsTo(Users, {
  foreignKey: "userId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

module.exports = { Users, Feeds };
