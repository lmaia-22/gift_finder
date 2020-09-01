const express = require("express");
const router = express.Router();

var UserController = require('../controllers/user');
var checkAuth = require('../middleware/check-auth');
var edituser = require('../middleware/edit-user');

router.post("/signup", UserController.user_signup);

router.post("/login", UserController.user_login);

router.put("/:userID", edituser, UserController.user_update);

router.get("/:userID", checkAuth, UserController.user_profile);

router.delete("/:userID", checkAuth, UserController.user_delete);

router.get("/", UserController.users_all);

module.exports = router;