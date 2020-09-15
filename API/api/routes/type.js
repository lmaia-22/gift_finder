const express = require("express");
const router = express.Router();

var TypeController = require('../controllers/type');
var checkAuth = require('../middleware/check-auth');

router.post("/", TypeController.type_new);

router.get("/:typeID", TypeController.type_option);

router.get("/", TypeController.type_all);

router.put("/:typeID", TypeController.type_update);

router.delete("/:typeID", TypeController.type_delete);

module.exports = router;