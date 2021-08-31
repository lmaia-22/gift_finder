const express = require("express");
const router = express.Router();

var RoleController = require('../controllers/role');
var checkAuth = require('../middleware/check-auth');

router.post("/", RoleController.role_new);

router.get("/:roleID", RoleController.role_option);

router.get("/", RoleController.role_all);

router.put("/:roleID", RoleController.role_update);

router.delete("/:roleID", RoleController.role_delete);

module.exports = router;