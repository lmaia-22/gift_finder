const express = require("express");
const router = express.Router();

var eventController = require('../controllers/event');
var checkAuth = require('../middleware/check-auth');

router.post("/", eventController.event_new);

router.get("/:eventID", eventController.event_option);

router.get("/", eventController.event_all);

router.put("/:jobID", eventController.event_update);

router.delete("/:jobID", eventController.event_delete);

module.exports = router;