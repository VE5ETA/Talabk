"use strict";
const router = require("express").Router();
const menuController = require("../controllers/menu");
const { logo, LimitErrorHandler } = require("../middlewares/multer");
// const { pdf, LimitErrorHandler } = require("../middlewares/multer");

//router.post("/getmenu:id", verifyUser, businessController.done);
//router.post("/reject", verifyUser, businessController.reject);

router.post("/", logo.single("logo"), LimitErrorHandler, menuController.create);
router.get("/", menuController.info);
router.put("/", menuController.update);
router.delete("/", menuController.delete);

router.post("/addItem", menuController.addItem);

module.exports = router;
