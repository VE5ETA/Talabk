"use strict";
const router = require("express").Router();
const businessController = require("../controllers/business");
const { verifyUser } = require("../middlewares/authenticate");
const { pdf, LimitErrorHandler } = require("../middlewares/multer");
// business management
router.post("/create", verifyUser, businessController.create);
router.get("/info", verifyUser, businessController.info);
router.put("/update", verifyUser, businessController.update);
router.delete("/delete", verifyUser, businessController.delete);
router.post(
  "/uploadDocs",
  verifyUser,
  pdf.single("pdf"),
  LimitErrorHandler,
  businessController.uploadDocs
);
router.get("/downloadDocs", verifyUser, businessController.downloadDocs);

// employees management
// router.post("/addEmployee", verifyUser, businessController.addEmployee); // will make it in version 2
// router.delete("/removeEmployee", verifyUser, businessController.removeEmployee); // will make it in version 2

// actions for orders
router.get("/showNewOrder", verifyUser, businessController.showNewOrder);
router.post("/accept", verifyUser, businessController.accept);
router.delete("/reject", verifyUser, businessController.reject);
router.put("/updateStatus", verifyUser, businessController.updateStatus);
router.get("/showActiveOrder", verifyUser, businessController.showActiveOrder);

module.exports = router;
