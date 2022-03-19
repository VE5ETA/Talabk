"use strict";
const router = require("express").Router();
const orderController = require("../controllers/order");

// actions for orders
router.get("/showNewOrder", orderController.showNewOrder);
router.post("/accept", orderController.accept);
router.post("/done", orderController.done);
router.post("/reject", orderController.reject);
router.put("/updateStatus", orderController.updateStatus);
router.get("/showActiveOrder", orderController.showActiveOrder);

module.exports = router;
