"use strict";
const router = require("express").Router();
const menuController = require("../controllers/menu");
const { logo, LimitErrorHandler, item } = require("../middlewares/multer");

//router.post("/getmenu:id", verifyUser, businessController.done);
//router.post("/reject", verifyUser, businessController.reject);

router.post("/", logo.single("logo"), LimitErrorHandler, menuController.create);
router.get("/", menuController.info);
router.put("/", logo.single("logo"), LimitErrorHandler, menuController.update);
router.delete("/", menuController.delete);

router.post(
  "/Item",
  item.single("item"),
  LimitErrorHandler,
  menuController.addItem
);
router.get("/Item", menuController.getItem);
router.put(
  "/Item",
  item.single("item"),
  LimitErrorHandler,
  menuController.updateItem
);
router.delete("/Item", menuController.deleteItem);
router.get("/menuLogo", menuController.menuLogo); //temp -- only for testing 🧪
router.get("/menuQR", menuController.menuQR); //temp -- only for testing 🧪
router.get("/fullmenu", menuController.fullmenu); //full menu with items 🌝

module.exports = router;
