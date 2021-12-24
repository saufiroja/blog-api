const { Model, DataTypes } = require("sequelize");
const sequelize = require("./sequelize");

class UserProfiles extends Model {}

UserProfiles.init(
  {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bio: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "UserProfiles",
    tableName: "UserProfiles",
    paranoid: true,
    timestamps: true,
  }
);

module.exports = { UserProfiles };
