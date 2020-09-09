const express = require("express");
const router = express.Router();

var TypeController = require('../controllers/type');
var checkAuth = require('../middleware/check-auth');

router.post("/", checkAuth, TypeController.type_new);

router.get("/:typeID", checkAuth, TypeController.type_option);

router.get("/", checkAuth, TypeController.type_all);

router.put("/:typeID", checkAuth, TypeController.type_update);

router.delete("/:typeID", checkAuth, TypeController.type_delete);

module.exports = router;