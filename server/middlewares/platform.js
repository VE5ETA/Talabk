"use strict";
const User = require("../models/user"); //you may need me
exports.verifyPlatform = (req, res, next) => {
  User.findById(req.user._id).then(
    (user) => {
      if (user.workIn?.toString() === process.env.PLATFORM_SECRET) {
        next();
      } else {
        res.status(401).send({
          message: "user type is not allowed",
          success: false,
        });
      }
    },
    (err) => {
      res.status(400).send({
        message: err,
        success: false,
      });
    }
  );
};
