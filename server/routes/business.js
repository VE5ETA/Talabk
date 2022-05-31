"use strict";
const router = require("express").Router();
const businessController = require("../controllers/business");
const { pdf, LimitErrorHandler } = require("../middlewares/multer");
const { isValidBuz } = require("../middlewares/middleware");
const order = require("./order");
const menu = require("./menu");
// business management

router.post(
  "/",
  pdf.single("pdf"),
  LimitErrorHandler,
  businessController.create
);
router.get("/", businessController.info);
router.put(
  "/",
  pdf.single("pdf"),
  LimitErrorHandler,
  businessController.update
);
router.delete("/", businessController.delete);
//this were used in old version
// router.post(
//   "/uploadDocs",
//   pdf.single("pdf"),
//   LimitErrorHandler,
//   businessController.uploadDocs
// );
router.get("/downloadDocs", businessController.downloadDocs);

// employees management
// router.post("/addEmployee", verifyUser, businessController.addEmployee); // will make it in version 2
// router.delete("/removeEmployee", verifyUser, businessController.removeEmployee); // will make it in version 2

router.use("/order", isValidBuz, order); //isValidObjID removed to use it more specific on the needed routes
router.use("/menu", isValidBuz, menu); //isValidObjID removed to use it more specific on the needed routes

module.exports = router;
