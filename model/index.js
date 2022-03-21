const Sequelize = require("sequelize");
const sequelize = require("../database");

module.exports.UserModal = sequelize.define("user", {
  id: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  email: {
    type: Sequelize.STRING(100),
    allowNull: true,
    unique: true,
  },
  password: {
    type: Sequelize.STRING(50),
    allowNull: true,
    unique: true,
  },
  type: {
    type: Sequelize.TINYINT(4),
    allowNull: false,
    defaultValue: 2,
  },
  resetkey_time: {
    type: Sequelize.DATE(),
    allowNull: true,
    defaultValue: null,
  },
});
