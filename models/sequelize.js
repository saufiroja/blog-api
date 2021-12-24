const { Sequelize } = require("sequelize");
const { DB_USER, DB_PASS, DB_NAME, DB_HOST, DB_PORT } = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  port: parseInt(DB_PORT, 10),
  dialect: "postgres",
  logging: false,
});

sequelize.authenticate().then(() => {
  console.log("connect on databse");
});

module.exports = sequelize;
