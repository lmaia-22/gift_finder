const express = require("express");
const router = express.Router();

var GenderController = require('../controllers/gender');
var checkAuth = require('../middleware/check-auth');

router.post("/", checkAuth, GenderController.gender_new);

router.get("/:ageID", checkAuth, GenderController.gender_option);

router.get("/", checkAuth, GenderController.gender_all);

router.put("/:ageID", checkAuth, GenderController.gender_update);

router.delete("/:ageID", checkAuth, GenderController.gender_delete);

module.exports = router;