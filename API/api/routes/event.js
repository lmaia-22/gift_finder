const express = require("express");
const router = express.Router();

var eventController = require('../controllers/event');
var checkAuth = require('../middleware/check-auth');

router.post("/", checkAuth, eventController.event_new);

router.get("/:eventID", checkAuth, eventController.event_option);

router.get("/", checkAuth, eventController.event_all);

router.put("/:jobID", checkAuth, eventController.event_update);

router.delete("/:jobID", checkAuth, eventController.event_delete);

module.exports = router;