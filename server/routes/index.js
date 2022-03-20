"use strict";
const router = require("express").Router();
const user = require("./user");

const customer = require("./customer");

router.use("/user", user);
router.use("/customer", customer);

router.get("/", (req, res) => {
  res.send({ status: "success" });
});
//@id could be menu id or restuernt id or restuernt 'trade username'
router.get("/@:id", (req, res) => {
  res.send("hey " + req.params.id + " 😁");
});

module.exports = router;
