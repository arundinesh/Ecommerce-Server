var express = require("express");
var router = express.Router();
var jwt = require("../jwt/index");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});
router.post("/login", function (req, res, next) {
  console.log(req.body);
  const generateToken = jwt.generateAccessToken();
  res.send("respond with a sd  sdfresource");
});
router.post("/signin", function (req, res, next) {
  res.send("respond with a sd  sdfresource");
});
router.post("/forgot_password", function (req, res, next) {
  res.send("respond with a sd  sdfresource");
});
router.post("/change_password", function (req, res, next) {
  res.send("respond with a sd  sdfresource");
});
router.post("/reset_password", function (req, res, next) {
  res.send("respond with a sd  sdfresource");
});

module.exports = router;
