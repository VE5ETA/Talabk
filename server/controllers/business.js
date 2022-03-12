"use strict";
const User = require("../models/user");
const Business = require("../models/business");

module.exports = {
  create: (req, res, next) => {
    if (!req.body.businessName) {
      res.statusCode = 500;
      res.send({
        name: "businessNameError",
        message: "business name is required",
      });
    } else if (!req.body.legalName) {
      res.statusCode = 500;
      res.send({
        name: "legalNameError",
        message: "legal name is required",
      });
    } else {
      User.findById(req.user._id).then((user) => {
        if (user.workIn) {
          res.send({
            message: "you are already have business",
          });
        } else {
          const newBusiness = new Business({
            ownerID: user._id,
            businessName: req.body.businessName,
            legalName: req.body.legalName,
          });

          newBusiness.save();

          user.workIn = { business: req.body.legalName, role: "owner" };

          user.save((err, business) => {
            if (err) {
              res.statusCode = 500;
              res.send(err);
            } else {
              res.send({ success: true });
            }
          });
        }
      });
    }
  },
  info: (req, res, next) => {},
  update: (req, res, next) => {},
  delete: (req, res, next) => {},
  addEmployee: (req, res, next) => {},
  removeEmployee: (req, res, next) => {},
  showNewOrder: (req, res, next) => {},
  accept: (req, res, next) => {},
  refusal: (req, res, next) => {},
  updateStatus: (req, res, next) => {},
  showActiveOrder: (req, res, next) => {},
};
