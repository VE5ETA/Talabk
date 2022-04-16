"use strict";
const router = require("express").Router();
const customerController = require("../controllers/customer");

router.post("/", customerController.createOrder);
router.put("/", customerController.editOrder); // only if order not accepted by business
router.delete("/", customerController.cancelOrder); // only if order not accepted by business
router.get("/", customerController.getOrder); // get active or current order by phone number

// router.get("/previousOrders", customerController.previousOrders); // get previous order by phone number ( optional )

module.exports = router;
