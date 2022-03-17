const multer = require("multer");
const connection = require("../database");
const { authenticateToken } = require("../jwt");
const productSchema = require("../schema");

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `images/product-${file.fieldname}-${Date.now()}.${ext}`);
  },
});

const multerFilter = (req, file, cb) => {
  let ext = file.mimetype.split("/")[1];
  if (ext !== ".png" && ext !== ".jpg" && ext !== ".gif" && ext !== ".jpeg") {
    cb(null, true);
  } else {
    cb(new Error("Not a PDF File!!"), false);
  }
};
const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

module.exports.getProducts = function (req, res) {
  let user = authenticateToken(req, res);
  console.log(user);
  // if (!user) {
  console.log(user);
  connection.query("SELECT * FROM products", function (err, rows, fileds) {
    if (err) throw err;
    if (rows.length > 0) {
      res.send({ msg: "success" });
    } else {
      res.status(404).send({ msg: "no data found!!!" });
    }
  });
  // } else {
  // }
};
module.exports.addProducts =
  (upload.array("product_image"),
  function (req, res) {
    let { error } = productSchema.addProductSchema.validate(req.body);
    if (error?.message)
      return res.status(422).json({
        message: error?.message,
      });

    let user = authenticateToken(req, res);
    let productData = req.body;

    if (user) {
      connection.query(
        `SELECT id as user_id, type FROM user WHERE email="${user}" AND type="1"`,
        function (err, rows, fileds) {
          if (err) throw err;
          if (rows.length > 0) {
            connection.query(
              `INSERT INTO products (name, description, price, qty) VALUES ("${productData.product_name}","${productData.product_desc}","${productData.product_price}","${productData.product_qty}")`,
              function (err, rows, fileds) {
                if (err) throw err;

                res.send({ msg: "successfully added" });
              }
            );
          }
        }
      );
    } else {
      res.status(404).send({ msg: "Authentication needed!!!" });
    }
  });

module.exports.updateProducts = function (req, res) {
  let { error } = productSchema.updateProductSchema.validate(req.body);
  if (error?.message)
    return res.status(422).json({
      message: error?.message,
    });
  let user = authenticateToken(req, res);
  let productData = req.body;
  if (user) {
    connection.query(
      `SELECT id as user_id, type FROM user WHERE email="${user}" AND type="1"`,
      function (err, rows, fileds) {
        if (err) throw err;
        if (rows.length > 0) {
          connection.query(
            `SELECT id from products WHERE id="${productData.product_id}" `,
            function (err, rows, fileds) {
              if (err) throw err;
              if (rows.length > 0) {
                connection.query(
                  `UPDATE products SET name="${productData.product_name}", description ="${productData.product_desc}" , price= "${productData.product_price}", qty="${productData.product_qty}") WHERE id="${productData.product_id}" `,
                  function (err, rows, fileds) {
                    if (err) throw err;

                    res.send({ msg: "successfully updated" });
                  }
                );
              } else {
                res.status(404).send({ msg: "no data found!!!" });
              }
            }
          );
        }
      }
    );
  } else {
    res.status(404).send({ msg: "Authentication needed!!!" });
  }
};
module.exports.changestatusProducts = function (req, res) {
  let { error } = productSchema.changeProductStatusSchema.validate(req.body);
  if (error?.message)
    return res.status(422).json({
      message: error?.message,
    });
  let user = authenticateToken(req, res);
  let productData = req.body;
  if (user) {
    connection.query(
      `SELECT id as user_id, type FROM user WHERE email="${user}" AND type="1"`,
      function (err, rows, fileds) {
        if (err) throw err;
        if (rows.length > 0) {
          connection.query(
            `SELECT id from products WHERE id="${productData.product_id}" `,
            function (err, rows, fileds) {
              if (err) throw err;
              if (rows.length > 0) {
                connection.query(
                  `UPDATE products SET status="${productData.status}") WHERE id="${productData.product_id}" `,
                  function (err, rows, fileds) {
                    if (err) throw err;

                    res.send({ msg: "successfully changed" });
                  }
                );
              } else {
                res.status(404).send({ msg: "no data found!!!" });
              }
            }
          );
        }
      }
    );
  } else {
    res.status(404).send({ msg: "Authentication needed!!!" });
  }
};
module.exports.deleteProducts = function (req, res) {
  let deleteId = req.url?.split("/")?.[2];
  let user = authenticateToken(req, res);

  if (user) {
    connection.query(
      `SELECT id as user_id, type FROM user WHERE email="${user}" AND type="1"`,
      function (err, rows, fileds) {
        if (err) throw err;
        if (rows.length > 0) {
          connection.query(
            `SELECT id from products WHERE id="${deleteId}" `,
            function (err, rows, fileds) {
              if (err) throw err;
              if (rows.length > 0) {
                connection.query(
                  `UPDATE products SET status="-1" WHERE id="${deleteId}" `,
                  function (err, rows, fileds) {
                    if (err) throw err;
                    console.log(rows);
                    res.send({ msg: "successfully deleted" });
                  }
                );
              } else {
                res.status(404).send({ msg: "no data found!!!" });
              }
            }
          );
        }
      }
    );
  } else {
    res.status(404).send({ msg: "Authentication needed!!!" });
  }
};
