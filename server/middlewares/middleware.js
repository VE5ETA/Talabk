"use strict";
const { Business } = require("../models/business");

exports.isValidObjID = (req, res, next) => {
  try {
    if (req.body.ID.match(/^[0-9a-fA-F]{24}$/)) {
      next();
    } else {
      throw Error;
    }
  } catch (error) {
    res.status(400).send({
      message: error && "not valid Object ID", // the && will send the value if the error was null
      success: false,
    });
  }
};
exports.isValidBuz = (req, res, next) => {
  Business.findOne({ ownerID: req.user._id }).then((business) => {
    if (business) {
      if (business.businessStatus) {
        next();
      } else {
        res.status(403).send({
          message: business.businessState,
          success: false,
        });
      }
    } else {
      res.status(404).send({
        message: "you don't have business yet",
        success: false,
      });
    }
  });
};
