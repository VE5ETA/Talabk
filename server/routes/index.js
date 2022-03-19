"use strict";
const router = require("express").Router();
const user = require("./user");

const customer = require("./customer");

router.use("/user", user);
router.use("/customer", customer);

router.get("/", (req, res) => {
  res.send({ status: "success" });
});

module.exports = router;
