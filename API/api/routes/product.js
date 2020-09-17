const express = require("express");
const router = express.Router();

var ProductController = require('../controllers/product');
var checkAuth = require('../middleware/check-auth');

router.post("/", ProductController.product_new);

router.get("/:productID", ProductController.product_option);

router.get("/", ProductController.product_all);

router.put("/:productID", ProductController.product_update);

router.delete("/:productID", ProductController.product_delete);

module.exports = router;