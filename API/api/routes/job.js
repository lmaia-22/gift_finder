const express = require("express");
const router = express.Router();

var JobController = require('../controllers/job');
var checkAuth = require('../middleware/check-auth');

router.post("/", checkAuth, JobController.job_new);

router.get("/:jobID", checkAuth, JobController.job_option);

router.get("/", checkAuth, JobController.job_all);

router.put("/:jobID", checkAuth, JobController.job_update);

router.delete("/:jobID", checkAuth, JobController.job_delete);

module.exports = router;