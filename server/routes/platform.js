const router = require("express").Router();
const platformController = require("../controllers/platform");

router.get("/adminAccountTest", platformController.test);
router.get("/showNewRequest", platformController.showNewRequest);
router.post("/acceptBuz", platformController.acceptBuz);
router.post("/rejectBuz", platformController.rejectBuz);
router.get("/showActiveBuz", platformController.showActiveBuz); // for get all Active business
router.get("/showSuspensionBuz", platformController.showSuspensionBuz); // for get all suspension business

module.exports = router;