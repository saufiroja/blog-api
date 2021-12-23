const { Model, DataTypes } = require("sequelize");
const sequelize = require("./sequelize");

class Feeds extends Model {}

Feeds.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    body: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Feeds",
    tableName: "Feeds",
    timestamps: true,
    paranoid: true,
  }
);

module.exports = { Feeds };
