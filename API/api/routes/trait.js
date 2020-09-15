const express = require("express");
const router = express.Router();

var TraitController = require('../controllers/trait');
var checkAuth = require('../middleware/check-auth');

router.post("/", checkAuth, TraitController.trait_new);

router.get("/:typeID", checkAuth, TraitController.trait_option);

router.get("/", checkAuth, TraitController.trait_all);

router.put("/:typeID", checkAuth, TraitController.trait_update);

router.delete("/:typeID", checkAuth, TraitController.trait_delete);

module.exports = router;