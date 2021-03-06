"use strict";
const User = require("../models/user");
const { Business, BuzDocs } = require("../models/business");
const { Menu } = require("../models/menu");

module.exports = {
  //old create
  // create: (req, res, next) => {
  //   try {
  //     if (!req.body.tradeName) {
  //       res.statusCode = 500;
  //       res.send({
  //         name: "tradeNameError",
  //         message: "business name is required",
  //       });
  //     }
  //     // else if (!req.body.legalName) { // removed
  //     //   res.statusCode = 500;
  //     //   res.send({
  //     //     name: "legalNameError",
  //     //     message: "legal name is required",
  //     //   });
  //     // }
  //     else if (!req.body.branchID) {
  //       res.statusCode = 500;
  //       res.send({
  //         name: "branchIDError",
  //         message: "Branch ID is required",
  //       });
  //     } else {
  //       User.findById(req.user._id).then((user) => {
  //         if (user.workIn) {
  //           res.status(403).send({
  //             message: "you already have a business",
  //           });
  //         } else {
  //           //this was updated for the changes made in business model ⚠
  //           //this will look for if Business branchID exsit with ignoring letters case
  //           Business.findOne({
  //             tradeName: req.body.tradeName,
  //             branchID: { $regex: new RegExp(req.body.branchID, "i") },
  //           }).then((business) => {
  //             if (business) {
  //               res.send({
  //                 message: " this business Branch ID already exist",
  //               });
  //             } else {
  //               const newBusiness = new Business({
  //                 ownerID: user._id,
  //                 // username: req.body.username, // removed
  //                 tradeName: req.body.tradeName,
  //                 branchID: req.body.branchID,
  //                 businessType: req.body.businessType,
  //               });

  //               newBusiness.save((err, business) => {
  //                 if (err) {
  //                   res.status(500).send({
  //                     message: err,
  //                     success: false,
  //                   });
  //                 } else {
  //                   user.workIn = business._id;
  //                   user.save((err, user) => {
  //                     if (err) {
  //                       res.status(500).send({
  //                         message: err,
  //                         success: false,
  //                       });
  //                     } else {
  //                       res.status(200).send({
  //                         message: "business was created",
  //                         success: true,
  //                       });
  //                     }
  //                   });
  //                 }
  //               });
  //             }
  //           });
  //         }
  //       });
  //     }
  //   } catch (error) {
  //     res.status(400).send({
  //       message: error,
  //       success: false,
  //     });
  //   }
  // },
  info: (req, res, next) => {
    try {
      Business.findOne({ _id: req.user.workIn })
        // .populate("ownerID") // there is no need for this :D
        .then((business) => {
          if (business) {
            res.status(200).send(business);
          } else {
            res.status(404).send({
              message: "you don't have business",
            });
          }
        });
    } catch (error) {
      res.status(400).send({
        message: error,
        success: false,
      });
    }
  },
  update: (req, res, next) => {
    // this needs to updated ❗
    try {
      Business.findOne({ ownerID: req.user._id }).then(async (business) => {
        if (business) {
          // let branch = false;
          if (req.body.tradeName) {
            business.tradeName = req.body.tradeName;
          }
          if (req.body.branchID) {
            business.branchID = req.body.branchID;
            // await Business.findOne({
            //   tradeName: req.body.tradeName,
            //   branchID: { $regex: new RegExp(req.body.branchID, "i") },
            // }).then((businessBranchIDexists) => {
            //   if (businessBranchIDexists) {
            //     branch = true;
            //   }
            // });
          }
          if (req.file) {
            BuzDocs.findOne({ _id: business.LegalDocs }).then((doc) => {
              if (doc) {
                doc.pdf = req.file.buffer;
                doc.save();
              }
            });
            business.businessState = "pending";
            business.businessStatus = false;
          }
          if (req.body.businessType) {
            business.businessType = req.body.businessType;
          }

          business.updatedAt = Date.now();
          business.save((err, business) => {
            if (err) {
              res.status(500).send({
                message: err,
                success: false,
              });
            } else {
              res.status(200).send({
                message: "business updated successfully",
                success: true,
              });
            }
          });
        } else {
          res.status(404).send({
            message: "you don't have business",
          });
        }
      });
    } catch (error) {
      res.status(400).send({
        message: error,
        success: false,
      });
    }
  },
  delete: (req, res, next) => {
    // should be updated to delete all related stuff as menu etc..
    try {
      if (!req.body.tradeName) {
        res.status(400).send({
          name: "tradeNameError",
          message: "trade Name is required to verify deleteing Business",
        });
      } else {
        Menu.findOne({
          businessID: req.user.workIn,
        }).then((menu) => {
          if (menu) {
            res.status(403).send({
              message: "you need to delete the menu first!! ",
              success: false,
            });
          } else {
            Business.findOne({ ownerID: req.user._id }).then((business) => {
              if (business) {
                if (business.tradeName !== req.body.tradeName) {
                  res.status(403).send({
                    message:
                      "please enter the correct business trade name to confirm deleting the business",
                    success: false,
                  });
                } else {
                  User.updateMany(
                    { workIn: business._id },
                    { $unset: { workIn: business._id } },
                    (err, result) => {
                      if (err) {
                        res.status(500).send({
                          message: err,
                          success: false,
                        });
                      } else {
                        business.remove((err, result) => {
                          if (err) {
                            res.status(500).send({
                              message: err,
                              success: false,
                            });
                          } else {
                            res.status(200).send({
                              message: "business deleted successfully",
                              success: true,
                            });
                          }
                        });
                      }
                    }
                  );
                }
              } else {
                res.status(404).send({
                  message: "you don't have business",
                });
              }
            });
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
  //this was uploadDocs perviously
  create: (req, res, next) => {
    try {
      if (!req.body.tradeName) {
        res.statusCode = 500;
        res.send({
          name: "tradeNameError",
          message: "business trade Name is required",
        });
      }
      // else if (!req.body.legalName) { // removed
      //   res.statusCode = 500;
      //   res.send({
      //     name: "legalNameError",
      //     message: "legal name is required",
      //   });
      // }
      else if (!req.body.branchID) {
        res.statusCode = 500;
        res.send({
          name: "branchIDError",
          message: "Branch ID is required",
        });
      } else if (!req.file) {
        res.statusCode = 500;
        res.send({
          name: "BusinessDocumentError",
          message: "business document is required",
        });
      } else {
        User.findById(req.user._id).then((user) => {
          if (user.workIn) {
            res.status(403).send({
              message: "you already have a business",
            });
          } else {
            //this was updated for the changes made in business model ⚠
            //this will look for if Business branchID exsit with ignoring letters case
            Business.findOne({
              tradeName: req.body.tradeName,
              branchID: { $regex: new RegExp(req.body.branchID, "i") },
            }).then((business) => {
              if (business) {
                res.send({
                  message: " this business Branch ID already exist",
                });
              } else {
                const newBusiness = new Business({
                  ownerID: user._id,
                  // username: req.body.username, // removed
                  tradeName: req.body.tradeName,
                  branchID: req.body.branchID,
                  businessType: req.body.businessType,
                });

                newBusiness.save((err, business) => {
                  if (err) {
                    res.status(500).send({
                      message: err,
                      success: false,
                    });
                  } else {
                    const buzDocs = new BuzDocs({
                      businessID: business._id,
                      pdf: req.file.buffer,
                    });
                    buzDocs.save((err, buzdoc) => {
                      if (err) {
                        res.status(500).send({
                          message: err,
                          success: false,
                        });
                      } else {
                        business.LegalDocs = buzdoc._id;
                        business.save((err, buz) => {
                          if (err) {
                            res.status(500).send({
                              message: err,
                              success: false,
                            });
                          } else {
                            user.workIn = business._id;
                            user.save((err, user) => {
                              if (err) {
                                res.status(500).send({
                                  message: err,
                                  success: false,
                                });
                              } else {
                                res.status(200).send({
                                  message: "business created successfully ",
                                  success: true,
                                });
                              }
                            });
                          }
                        });
                      }
                    });
                  }
                });
              }
            });
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
