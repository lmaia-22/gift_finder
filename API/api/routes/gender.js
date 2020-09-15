const express = require("express");
const router = express.Router();

var GenderController = require('../controllers/gender');
var checkAuth = require('../middleware/check-auth');

router.post("/", GenderController.gender_new);

router.get("/:genderID", GenderController.gender_option);

router.get("/", GenderController.gender_all);

router.put("/:genderID", GenderController.gender_update);

router.delete("/:genderID", GenderController.gender_delete);

module.exports = router;