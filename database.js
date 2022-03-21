// var mysql = require("mysql");
// var connection = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "Ecommerce",
// });

// connection.connect();

// module.exports = connection;
const Sequelize = require("sequelize");

const sequelize = new Sequelize("Ecommerce", "root", "", {
  host: "localhost",
  dialect: "mysql",
  operatorsAliases: false,
});

module.exports = sequelize;
