const express = require("express");
const router = express.Router();

var childcategoryController = require('../controllers/childcategory');
var checkAuth = require('../middleware/check-auth');

router.post("/", checkAuth, childcategoryController.childcategory_new);

router.get("/:childcategoryID", checkAuth, childcategoryController.childcategory_option);

router.get("/", checkAuth, childcategoryController.childcategory_all);

router.put("/:childcategoryID", checkAuth, childcategoryController.category_update);

router.delete("/:childcategoryID", checkAuth, childcategoryController.childcategory_delete);

module.exports = router;