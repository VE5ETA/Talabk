"use strict";
const router = require("express").Router();
const businessController = require("../controllers/business");
const { verifyUser } = require("../middlewares/authenticate");

router.post("/create", verifyUser, businessController.create);
router.get("/read", verifyUser, businessController.read);
router.put("/update", verifyUser, businessController.update);
router.delete("/delete", verifyUser, businessController.delete);

module.exports = router;
