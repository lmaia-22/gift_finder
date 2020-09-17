const express = require("express");
const router = express.Router();

var TraitController = require('../controllers/trait');
var checkAuth = require('../middleware/check-auth');

router.post("/", TraitController.trait_new);

router.get("/:traitID", TraitController.trait_option);

router.get("/", TraitController.trait_all);

router.put("/:traitID", TraitController.trait_update);

router.delete("/:traitID", TraitController.trait_delete);

module.exports = router;