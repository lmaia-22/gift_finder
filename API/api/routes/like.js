const express = require("express");
const router = express.Router();

var LikeController = require('../controllers/like');
var checkAuth = require('../middleware/check-auth');

router.post("/", LikeController.like_new);

router.get("/:likeID", LikeController.like_option);

router.get("/", LikeController.like_all);

router.put("/:likeID", LikeController.like_update);

router.delete("/:likeID", LikeController.like_delete);

module.exports = router;