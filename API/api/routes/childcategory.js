const express = require("express");
const router = express.Router();

var childcategoryController = require('../controllers/childcategory');
var checkAuth = require('../middleware/check-auth');

router.post("/", childcategoryController.childcategory_new);

router.get("/:childcategoryID", childcategoryController.childcategory_option);

router.get("/", childcategoryController.childcategory_all);

router.put("/:childcategoryID", childcategoryController.category_update);

router.delete("/:childcategoryID", childcategoryController.childcategory_delete);

module.exports = router;