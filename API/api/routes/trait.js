const express = require("express");
const router = express.Router();

var TraitController = require('../controllers/trait');
var checkAuth = require('../middleware/check-auth');

router.post("/", TraitController.trait_new);

router.get("/:typeID", TraitController.trait_option);

router.get("/", TraitController.trait_all);

router.put("/:typeID", TraitController.trait_update);

router.delete("/:typeID", TraitController.trait_delete);

module.exports = router;