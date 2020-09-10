const express = require("express");
const router = express.Router();

var categoryController = require('../controllers/category');
var checkAuth = require('../middleware/check-auth');

router.post("/", checkAuth, categoryController.category_new);

router.get("/:categoryID", checkAuth, categoryController.category_option);

router.get("/", checkAuth, categoryController.category_all);

router.put("/:categoryID", checkAuth, categoryController.category_update);

router.delete("/:categoryID", checkAuth, categoryController.category_delete);

module.exports = router;