var express = require("express");
const {
  getProducts,
  addProducts,
  deleteProducts,
  updateProducts,
  changestatusProducts,
} = require("../controller/productController");
var router = express.Router();

/* GET users listing. */
router.post("/", getProducts);
router.get("/view/:id", function (req, res, next) {
  res.send("respond with a resource");
});
router.post("/add", addProducts);
router.delete("/delete/:id", deleteProducts);
router.put("/update", updateProducts);
router.put("/change_status", changestatusProducts);

module.exports = router;
