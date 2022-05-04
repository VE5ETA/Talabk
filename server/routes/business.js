"use strict";
const router = require("express").Router();
const businessController = require("../controllers/business");
const { pdf, LimitErrorHandler } = require("../middlewares/multer");
const { isValidObjID } = require("../middlewares/middleware");
const order = require("./order");
const menu = require("./menu");
// business management

router.post("/", businessController.create);
router.get("/", businessController.info);
router.put("/", businessController.update);
router.delete("/", businessController.delete);
router.post(
  "/uploadDocs",
  pdf.single("pdf"),
  LimitErrorHandler,
  businessController.uploadDocs
);
router.get("/downloadDocs", businessController.downloadDocs);

// employees management
// router.post("/addEmployee", verifyUser, businessController.addEmployee); // will make it in version 2
// router.delete("/removeEmployee", verifyUser, businessController.removeEmployee); // will make it in version 2

router.use("/order", isValidObjID, order); //removed to use more specific on the needed routes
router.use("/menu", isValidObjID, menu); //removed to use more specific on the needed routes

module.exports = router;
