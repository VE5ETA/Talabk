"use strict";
const router = require("express").Router();
const menuController = require("../controllers/menu");
const { verifyUser } = require("../middlewares/authenticate");
// const { pdf, LimitErrorHandler } = require("../middlewares/multer");

//router.post("/getmenu:id", verifyUser, businessController.done);
//router.post("/reject", verifyUser, businessController.reject);

router.post("/", menuController.create);
router.get("/", menuController.info);
router.put("/", menuController.update);
router.delete("/", menuController.delete);

module.exports = router;
