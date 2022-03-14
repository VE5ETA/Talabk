"use strict";
const router = require("express").Router();
const userController = require("../controllers/user");
const passport = require("passport");
const { verifyUser } = require("../middlewares/authenticate");
// require("../controllers/authenticate");

// require("../controllers/LocalStrategy");
router.post("/signup", userController.signup);
router.post("/login", passport.authenticate("local"), userController.login);
router.post("/refreshToken", userController.refreshToken);
router.get("/me", verifyUser, userController.me);
router.get("/logout", verifyUser, userController.logout);

// router.post("/updateInfo", userController.updateInfo);
// router.post("/resetPass", userController.resetPass);

module.exports = router;
