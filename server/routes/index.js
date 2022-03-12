"use strict";
const router = require("express").Router();
const user = require("./user");
const business = require("./business");

router.use("/users", user);
router.use("/business", business);

router.get("/", (req, res) => {
  res.send({ status: "success" });
});

module.exports = router;
