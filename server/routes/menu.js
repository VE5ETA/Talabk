"use strict";
const router = require("express").Router();
const menuController = require("../controllers/menu");
const { logo, LimitErrorHandler, item } = require("../middlewares/multer");
const { isValidObjID } = require("../middlewares/middleware");

// ------------- Menu ------------- \\

router.post("/", logo.single("logo"), LimitErrorHandler, menuController.create);
router.get("/", menuController.info);
router.put("/", logo.single("logo"), LimitErrorHandler, menuController.update);
router.delete("/", menuController.delete);
// ------------- Item ------------- \\

router.post(
  "/Item",
  item.single("item"),
  LimitErrorHandler,
  menuController.addItem
);
router.get("/Item", isValidObjID, menuController.getItem);
router.put(
  "/Item",
  isValidObjID,
  item.single("item"),
  LimitErrorHandler,
  menuController.updateItem
);
router.delete("/Item", isValidObjID, menuController.deleteItem);
// ------------- table ------------- \\
router.post("/table", menuController.addTable);
router.get("/table", isValidObjID, menuController.getTable);
router.put("/table", isValidObjID, menuController.updateTable);
router.delete("/table", isValidObjID, menuController.deleteTable);

// ------------- Menu additional ------------- \\

router.get("/menuLogo", menuController.menuLogo); //temp -- only for testing 🧪
router.get("/menuQR", menuController.menuQR); //temp -- only for testing 🧪
router.get("/fullmenu", menuController.fullmenu); //full menu with items 🌝

module.exports = router;
