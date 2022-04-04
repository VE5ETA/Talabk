"use strict";
const User = require("../models/user");
const { Business } = require("../models/business");
const { BuzDocs } = require("../models/business");

const orderid = new RegExp(/^(\s\.\*\\)*[a-zA-Z0-9]{24,24}$/); // for order id

module.exports = {
  create: (req, res, next) => {
    try {
      if (!req.body.tradeName) {
        res.statusCode = 500;
        res.send({
          name: "tradeNameError",
          message: "business name is required",
        });
      }
      // else if (!req.body.legalName) { // removed
      //   res.statusCode = 500;
      //   res.send({
      //     name: "legalNameError",
      //     message: "legal name is required",
      //   });
      // }
      else if (!req.body.BranchID) {
        res.statusCode = 500;
        res.send({
          name: "BranchIDError",
          message: "Branch ID is required",
        });
      } else {
        User.findById(req.user._id).then((user) => {
          if (user.workIn) {
            res.statusCode = 500;
            res.send({
              message: "you are already have business",
            });
          } else if (user.workIn) {
            res.statusCode = 500;
            res.send({
              message: "you are already have business",
            });
          } else {
            Business.findOne({ tradeName: req.body.tradeName }).then(
              (business) => {
                if (business) {
                  res.send({
                    message: " business trade name already exist",
                  });
                } else {
                  const newBusiness = new Business({
                    ownerID: user._id,
                    // userName: req.body.userName, // removed
                    tradeName: req.body.tradeName,
                    BranchID: req.body.BranchID,
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
              }
            );
          }
        });
      }
    } catch (error) {
      res.status(400).send({
        message: error,
        success: false,
      });
    }
  },
  info: (req, res, next) => {
    Business.findOne({ _id: req.user.workIn })
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
          business.legalName = req.body.legalName;
        }
        if (req.body.businessType) {
          business.businessType = req.body.businessType;
        }

        business.updatedAt = Date.now();

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
            $unset: { workIn: business._id },
          },
          {},
          (err, result) => {
            //delete me later !!😁
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
  uploadDocs: (req, res, next) => {
    Business.findOne({ ownerID: req.user._id }).then((business) => {
      if (business) {
        const buzDocs = new BuzDocs({
          businessID: req.user.workIn,
          pdf: req.file.buffer,
        });

        buzDocs.save();
        business.LegalDocs = buzDocs._id;
        business.save();
        res.statusCode = 200;
        res.send({
          message: "document uploaded successfully",
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
  downloadDocs: (req, res, next) => {
    BuzDocs.findOne({ businessID: req.user.workIn }).then((buzDocs) => {
      if (buzDocs) {
        res.set("Content-Type", "application/pdf");
        res.send(buzDocs.pdf);
      } else {
        res.status(404).send({
          message: "file not found",
        });
      }
    });
  },
};
