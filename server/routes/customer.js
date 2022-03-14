"use strict";
const router = require("express").Router();
const customerController = require("../controllers/customer");

router.post("/createOrder", customerController.createOrder);

module.exports = router;
