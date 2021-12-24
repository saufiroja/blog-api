const { Users } = require("./Users.model");
const { Feeds } = require("./Feeds.model");

Users.hasMany(Feeds, {
  foreignKey: "userId",
});

Feeds.belongsTo(Users, {
  foreignKey: "userId",
});

module.exports = { Users, Feeds };
