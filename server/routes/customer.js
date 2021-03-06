"use strict";
const router = require("express").Router();
const customerController = require("../controllers/customer");

router.post("/", customerController.createOrder);
router.put("/", customerController.editOrder); // only if order not accepted by business
router.delete("/", customerController.cancelOrder); // only if order not accepted by business
router.post("/orders", customerController.getOrder); // get all order by phone number
router.get("/stores", customerController.showStores); // get all order by phone number
router.get("/@:username", customerController.fullmenu); // get all order by phone number

module.exports = router;
