"use strict";
const router = require("express").Router();
const User = require("./user");

router.use("/users", User);

router.get("/", (req, res) => {
  res.send({ status: "success" });
});

module.exports = router;
