"use strict";
const router = require("express").Router();
const Usercontroller = require("../controllers/user");
const passport = require("passport");
// require("../controllers/authenticate");

// require("../controllers/LocalStrategy");
router.post("/signup", Usercontroller.signup);
console.log("i got here");
router.post("/login", passport.authenticate("local"), Usercontroller.login);
router.post("/refreshToken", Usercontroller.refreshToken);

module.exports = router;
