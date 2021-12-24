const { Users } = require("./Users.model");
const { Feeds } = require("./Feeds.model");
const { UserProfiles } = require("./userProfiles.model");

// FEED
Users.hasMany(Feeds, {
  foreignKey: "userId",
});
Feeds.belongsTo(Users, {
  foreignKey: "userId",
});

// PROFILE
Users.hasOne(UserProfiles, {
  foreignKey: "userId",
});
UserProfiles.belongsTo(Users, {
  foreignKey: "userId",
});

module.exports = { Users, Feeds };
