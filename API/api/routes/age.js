const express = require("express");
const router = express.Router();

var AgeController = require('../controllers/age');
var checkAuth = require('../middleware/check-auth');

router.post("/", AgeController.age_new);

router.get("/:ageID", AgeController.age_option);

router.get("/",  AgeController.age_all);

router.put("/:ageID", AgeController.age_update);

router.delete("/:ageID", AgeController.age_delete);

module.exports = router;