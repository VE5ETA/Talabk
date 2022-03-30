const router = require("express").Router();
const platformController = require("../controllers/platform");

router.get("/adminAccountTest", platformController.test);

module.exports = router;
