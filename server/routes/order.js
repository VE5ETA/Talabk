"use strict";
const router = require("express").Router();
const orderController = require("../controllers/order");
const { isValidObjID } = require("../middlewares/middleware");

// actions for orders
router.get("/showNewOrder", orderController.showNewOrder);
router.post("/accept", isValidObjID, orderController.accept);
router.post("/done", isValidObjID, orderController.done);
router.post("/cancel", isValidObjID, orderController.cancel);
router.post("/reject", isValidObjID, orderController.reject);
router.put("/updateStatus", orderController.updateStatus);
router.get("/showActiveOrder", orderController.showActiveOrder);

module.exports = router;
