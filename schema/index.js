var joi = require("joi");
module.exports.loginSchema = joi.object({
  email: joi.string().email(),
  password: joi.string(),
});

module.exports.signinSchema = joi.object({
  email: joi.string().email(),
  password: joi.string(),
});

module.exports.forgotpassSchema = joi.object({
  email: joi.string().email(),
});

module.exports.changepassSchema = joi.object({
  userid: joi.number(),
  newpassword: joi.string(),
});

module.exports.resetpassSchema = joi.object({
  newpassword: joi.string(),
  reset_key: joi.string(),
});
