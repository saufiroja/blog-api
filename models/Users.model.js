const { Model, DataTypes } = require("sequelize");
const sequelize = require("./sequelize");

class Users extends Model {}

Users.init(
  {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Users",
    tableName: "Users",
    timestamps: true,
    paranoid: true,
  }
);

module.exports = { Users };
