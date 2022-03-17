var joi = require("joi");
module.exports.loginSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required(),
});

module.exports.signinSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required(),
});

module.exports.forgotpassSchema = joi.object({
  email: joi.string().email().required(),
});

module.exports.changepassSchema = joi.object({
  userid: joi.number().required(),
  newpassword: joi.string().required(),
});

module.exports.resetpassSchema = joi.object({
  newpassword: joi.string().required(),
  reset_key: joi.string().required(),
});

module.exports.resetpassSchema = joi.object({
  newpassword: joi.string().required(),
  reset_key: joi.string().required(),
});

module.exports.addProductSchema = joi.object({
  product_name: joi.string().required(),
  product_desc: joi.string().required(),
  product_price: joi.number().required(),
  product_qty: joi.number().required(),
  product_image: joi.array(),
});

module.exports.updateProductSchema = joi.object({
  product_id: joi.number().required(),
  product_name: joi.string().required(),
  product_desc: joi.string().required(),
  product_price: joi.number().required(),
  product_qty: joi.number().required(),
});

module.exports.changeProductStatusSchema = joi.object({
  product_id: joi.number().required(),
  status: joi.number().required(),
});
