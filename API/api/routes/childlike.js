const express = require("express");
const router = express.Router();

var childlikeController = require('../controllers/childlike');
var checkAuth = require('../middleware/check-auth');

router.post("/", childlikeController.childlike_new);

router.get("/:childlikeID", childlikeController.childlike_option);

router.get("/", childlikeController.childlike_all);

router.put("/:childlikeID", childlikeController.childlike_update);

router.delete("/:childlikeID", childlikeController.childlike_delete);

module.exports = router;