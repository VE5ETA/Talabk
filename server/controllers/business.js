"use strict";
const User = require("../models/user");
const Business = require("../models/business");

module.exports = {
  create: (req, res, next) => {
    if (!req.body.tradeName) {
      res.statusCode = 500;
      res.send({
        name: "tradeNameError",
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
        if (user.workIn || user.workIn !== "") {
          res.statusCode = 500;
          res.send({
            message: "you are already have business",
          });
        } else {
          const newBusiness = new Business({
            ownerID: user._id,
            tradeName: req.body.tradeName,
            legalName: req.body.legalName,
            businessType: req.body.businessType,
          });

          newBusiness.save();

          user.workIn = newBusiness._id;

          user.save((err, business) => {
            if (err) {
              res.statusCode = 500;
              res.send(err);
            } else {
              res.statusCode = 200;
              res.send({
                message: "business was created",
                success: true,
              });
            }
          });
        }
      });
    }
  },
  info: (req, res, next) => {
    Business.findOne({ ownerID: req.user._id })
      .populate("ownerID")
      .then((business) => {
        if (business) {
          res.statusCode = 200;
          res.send(business);
        } else {
          res.statusCode = 500;
          res.send({
            message: "you don't have business",
          });
        }
      });
  },
  update: (req, res, next) => {
    Business.findOne({ ownerID: req.user._id }).then((business) => {
      if (business) {
        if (req.body.tradeName) {
          business.tradeName = req.body.tradeName;
        }
        if (req.body.legalName) {
          // have error it role
          // User.updateMany(
          //   {
          //     workIn: business.legalName,
          //   },
          //   {
          //     workIn: req.body.legalName,
          //   },
          //   {},
          //   (err, result) => {
          //     if (err) console.log(err);
          //     else console.log(result);
          //   }
          // );

          business.legalName = req.body.legalName;
        }
        if (req.body.businessType) {
          business.businessType = req.body.businessType;
        }

        business.updatedAt = new Date.now();

        business.save();

        res.statusCode = 200;
        res.send({
          message: "business updated successfully",
          success: true,
        });
      } else {
        res.statusCode = 500;
        res.send({
          message: "you don't have business",
        });
      }
    });
  },
  delete: (req, res, next) => {
    Business.findOne({ ownerID: req.user._id }).then((business) => {
      if (business) {
        User.updateMany(
          {
            workIn: business._id,
          },
          {
            workIn: "",
          },
          {},
          (err, result) => {
            if (err) console.log(err);
            else console.log(result);
          }
        );

        business.remove();

        res.statusCode = 200;
        res.send({
          message: "business deleted successfully",
          success: true,
        });
      } else {
        res.statusCode = 500;
        res.send({
          message: "you don't have business",
        });
      }
    });
  },
  addEmployee: (req, res, next) => {}, // will make it in version 2
  removeEmployee: (req, res, next) => {}, // will make it in version 2
  showNewOrder: (req, res, next) => {},
  accept: (req, res, next) => {},
  refusal: (req, res, next) => {},
  updateStatus: (req, res, next) => {},
  showActiveOrder: (req, res, next) => {},
};
