var express = require("express");
var router = express.Router();

var controller = require("../controller/authController");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});
router.post("/login", controller.login);
router.post("/signin", controller.signin);
router.post("/forgot_password", controller.forgotPassword);
router.post("/change_password", controller.changePassword);
router.post("/reset_password", controller.resetPassword);

module.exports = router;
