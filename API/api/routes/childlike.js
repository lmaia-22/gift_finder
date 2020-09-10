const express = require("express");
const router = express.Router();

var childlikeController = require('../controllers/childlike');
var checkAuth = require('../middleware/check-auth');

router.post("/", checkAuth, childlikeController.childlike_new);

router.get("/:childlikeID", checkAuth, childlikeController.childlike_option);

router.get("/", checkAuth, childlikeController.childlike_all);

router.put("/:childlikeID", checkAuth, childlikeController.childlike_update);

router.delete("/:childlikeID", checkAuth, childlikeController.childlike_delete);

module.exports = router;