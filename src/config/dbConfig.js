const Sequelize = require("sequelize");

const dbConnection = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    port: process.env.DB_PORT,
  }
);

dbConnection
  .authenticate()
  .then(() => {
    console.log("Connected with database.");
  })
  .catch((err) => {
    console.error("Connection error occured:", err);
  });

module.exports = dbConnection;
