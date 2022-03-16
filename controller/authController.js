var connection = require("../database");
var sha1 = require("sha1");
var jwt = require("../jwt/index");
const { v4: uuidv4 } = require("uuid");
var moment = require("moment");
const { CURRENT_DATETIME } = require("../utility");
const authSchema = require("../schema");

module.exports.login = function (req, res) {
  let userData = req.body;
  let { error } = authSchema.loginSchema.validate(userData);
  if (error?.message)
    return res.status(422).json({
      message: error?.message,
    });
  connection.query(
    `SELECT email, password ,type as user_type FROM user WHERE email="${userData.email}"`,
    function (err, rows, fileds) {
      if (err) throw err;
      if (rows.length > 0) {
        let encryptPass = sha1(userData.password);
        if (rows[0].password === encryptPass) {
          const generateToken = jwt.generateAccessToken(rows[0].email);
          rows[0].token = generateToken;
          delete rows[0].password;
          res.json({ msg: "success", data: rows[0] });
        } else {
          res.status(404).send({ msg: "Incorrect password!!!" });
        }
      } else {
        res.status(404).send({ msg: "user not found!!" });
      }
    }
  );
};
module.exports.signin = function (req, res) {
  let userData = req.body;
  let { error } = authSchema.signinSchema.validate(userData);
  if (error?.message)
    return res.status(422).json({
      message: error?.message,
    });
  let encryptPass = sha1(userData.password);
  connection.query(
    `INSERT INTO user (email, password) VALUES ("${userData.email}", "${encryptPass}")`,
    function (err, rows, fileds) {
      if (err) throw err;
      else {
        connection.query(
          `SELECT * FROM user WHERE email="${userData.email}"`,
          function (err, rows, fileds) {
            if (err) throw err;
            if (rows.length > 0) {
              res.json({ msg: "success", data: rows });
            } else {
              res.send(404, { msg: "user not found!!" });
            }
          }
        );
      }
    }
  );
};

module.exports.forgotPassword = function (req, res) {
  let userData = req.body;
  let { error } = authSchema.forgotpassSchema.validate(userData);
  if (error?.message)
    return res.status(422).json({
      message: error?.message,
    });
  connection.query(
    `SELECT id as user_id FROM user WHERE email="${userData.email}"`,
    function (err, rows, fileds) {
      if (err) throw err;
      if (rows.length > 0) {
        let reset_time = moment().format("YYYY-MM-DD HH:mm:ss");
        let uid = uuidv4();
        connection.query(
          `UPDATE user SET reset_key="${uid}",resetkey_time="${reset_time}", updated_date="${CURRENT_DATETIME}" WHERE id="${rows[0].user_id}"`,
          function (err, rows, fileds) {
            if (err) throw err;

            res.json({
              msg: "success",
              data: { ...rows[0], reset_key: uid, reset_per_sec: 300 },
            });
          }
        );
      } else {
        res.status(404).send({ msg: "user not found!!" });
      }
    }
  );
};

module.exports.changePassword = function (req, res) {
  let userInfo = jwt.authenticateToken(req);
  let changedData = req.body;
  let { error } = authSchema.changepassSchema.validate(changedData);
  if (error?.message)
    return res.status(422).json({
      message: error?.message,
    });
  connection.query(
    `SELECT id as user_id FROM user WHERE email="${userInfo}" AND id="${changedData.userid}"`,
    function (err, rows, fileds) {
      if (err) throw err;
      if (rows.length > 0) {
        let encryptPass = sha1(changedData.newpassword);
        connection.query(
          `UPDATE user SET password="${encryptPass}", updated_date="${CURRENT_DATETIME}" WHERE id="${changedData.userid}"`,
          function () {
            if (err) throw err;
            res.json({
              msg: "successfully changed",
            });
          }
        );
      }
    }
  );
};
module.exports.resetPassword = function (req, res) {
  let resetData = req.body;
  let { error } = authSchema.resetpassSchema.validate(resetData);
  if (error?.message)
    return res.status(422).json({
      message: error?.message,
    });
  connection.query(
    `SELECT id as user_id,resetkey_time FROM user WHERE reset_key="${resetData.reset_key}"`,
    function (err, rows, fileds) {
      if (err) throw err;
      if (rows.length > 0) {
        var ms = moment().diff(
          moment(rows[0].resetkey_time, "YYYY-MM-DD HH:mm:ss")
        );
        var d = moment.duration(ms).asSeconds();
        if (d < 300) {
          let encryptPass = sha1(resetData.newpassword);
          connection.query(
            `UPDATE user SET password="${encryptPass}",resetkey_time=null,reset_key=null, updated_date="${CURRENT_DATETIME}" WHERE id="${rows[0].user_id}"`,
            function (err, rows, fileds) {
              if (err) throw err;

              res.json({
                msg: "successfully reset",
              });
            }
          );
        } else {
          res.status(404).send({ msg: "Time exceeds!" });
        }
      }
    }
  );
};
