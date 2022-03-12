var mysql = require("mysql");
var connection = mysql.createConnection({
  host: "master.cywau7vvtnsm.us-east-2.rds.amazonaws.com",
  user: "admin",
  password: "Arun3143",
  database: "Demo",
});

connection.connect();

module.exports = connection;
