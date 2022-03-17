var express = require("express");
var router = express.Router();

/* GET users listing. */

router.get("/cartitem", function (req, res, next) {
  res.send("respond with a resource");
});
router.post("/addcart", function (req, res, next) {
  res.send("respond with a resource");
});
router.delete("/deletecart", function (req, res, next) {
  res.send("respond with a resource");
});
router.put("/updatecart", function (req, res, next) {
  res.send("respond with a resource");
});

module.exports = router;
