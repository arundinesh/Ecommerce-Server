var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});
router.post("/listproducts", function (req, res, next) {
  console.log(req.body);
  res.send("respond with a sd  sdfresource");
});
router.post("/addproducts", function (req, res, next) {
  console.log(req.body);
  res.send("respond with a sd  sdfresource");
});
router.post("/editproducts", function (req, res, next) {
  console.log(req.body);
  res.send("respond with a sd  sdfresource");
});
router.post("/delete", function (req, res, next) {
  console.log(req.body);
  res.send("respond with a sd  sdfresource");
});

module.exports = router;
