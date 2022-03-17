"use strict";
const router = require("express").Router();
const customerController = require("../controllers/customer");

router.post("/createOrder", customerController.createOrder);
// router.post("/getOrder", customerController.getOrder);

module.exports = router;
