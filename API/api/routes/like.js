const express = require("express");
const router = express.Router();

var LikeController = require('../controllers/like');
var checkAuth = require('../middleware/check-auth');

router.post("/", checkAuth, LikeController.like_new);

router.get("/:likeID", checkAuth, LikeController.like_option);

router.get("/", checkAuth, LikeController.like_all);

router.put("/:likeID", checkAuth, LikeController.like_update);

router.delete("/:likeID", checkAuth, LikeController.like_delete);

module.exports = router;