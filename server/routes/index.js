"use strict";
const router = require("express").Router();
const user = require("./user");
const business = require("./business");
const customer = require("./customer");

router.use("/users", user);
router.use("/business", business);
router.use("/customer", customer);

router.get("/", (req, res) => {
  res.send({ status: "success" });
});

module.exports = router;
