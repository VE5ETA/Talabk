"use strict";
const router = require("express").Router();
const userController = require("../controllers/user");
const passport = require("passport");
const { verifyUser } = require("../middlewares/authenticate");
const { verifyPlatform } = require("../middlewares/platform");
const business = require("./business");
const platform = require("./platform");
// require("../controllers/authenticate");
// require("../controllers/LocalStrategy");
router.use("/business", verifyUser, business);
router.use("/platform", verifyUser, verifyPlatform, platform);

router.post("/signup", userController.signup);
router.post("/login", passport.authenticate("local"), userController.login);
router.post("/refreshToken", userController.refreshToken);
router.get("/me", verifyUser, userController.me);
router.get("/logout", verifyUser, userController.logout);

// router.post("/updateInfo", userController.updateInfo);
// router.post("/resetPass", userController.resetPass);

module.exports = router;
