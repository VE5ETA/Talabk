"use strict";
const router = require("express").Router();
const menuController = require("../controllers/menu");
const { logo, LimitErrorHandler } = require("../middlewares/multer");

//router.post("/getmenu:id", verifyUser, businessController.done);
//router.post("/reject", verifyUser, businessController.reject);

router.post("/", logo.single("logo"), LimitErrorHandler, menuController.create);
router.get("/", menuController.info);
router.put("/", menuController.update);
router.delete("/", menuController.delete);

router.post("/addItem", menuController.addItem);
router.get("/menuLogo", menuController.menuLogo); //temp -- only for testing 🧪
router.get("/menuQR", menuController.menuQR); //temp -- only for testing 🧪

module.exports = router;
