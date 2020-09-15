const express = require("express");
const router = express.Router();

var JobController = require('../controllers/job');
var checkAuth = require('../middleware/check-auth');

router.post("/", JobController.job_new);

router.get("/:jobID", JobController.job_option);

router.get("/", JobController.job_all);

router.put("/:jobID", JobController.job_update);

router.delete("/:jobID", JobController.job_delete);

module.exports = router;