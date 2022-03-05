"use strict";
const router = require("express").Router();
const Usercontroller = require("../controllers/user");
const passport = require("passport");
const { verifyUser } = require("../controllers/authenticate");
// require("../controllers/authenticate");

// require("../controllers/LocalStrategy");
router.post("/signup", Usercontroller.signup);
router.post("/login", passport.authenticate("local"), Usercontroller.login);
router.post("/refreshToken", Usercontroller.refreshToken);
router.get("/me", verifyUser, Usercontroller.me);
router.get("/logout", verifyUser, Usercontroller.logout);

module.exports = router;
