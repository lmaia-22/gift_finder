const express = require("express");
const router = express.Router();

var categoryController = require('../controllers/category');
var checkAuth = require('../middleware/check-auth');

router.post("/",  categoryController.category_new);

router.get("/:categoryID",  categoryController.category_option);

router.get("/", categoryController.category_all);

router.put("/:categoryID",  categoryController.category_update);

router.delete("/:categoryID", categoryController.category_delete);

module.exports = router;