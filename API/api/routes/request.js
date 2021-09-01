const express = require("express");
const router = express.Router();

var RequestController = require('../controllers/request');
var checkAuth = require('../middleware/check-auth');

router.post("/", RequestController.request_new);

router.get("/:requestID", RequestController.request_option);

router.get("/",  RequestController.request_all);

router.put("/:requestID", RequestController.request_update);

router.delete("/:requestID", RequestController.request_delete);

module.exports = router;