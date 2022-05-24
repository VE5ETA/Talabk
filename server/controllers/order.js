const { Order } = require("../models/order");
const { Business } = require("../models/business");
const mongoose = require("mongoose");

module.exports = {
  showNewOrder: (req, res, next) => {
    if (req.user.workIn) {
      Order.find({ businessID: req.user.workIn, orderState: "new" }).then(
        (order) => {
          if (order) {
            res.status(200).send(order);
          } else {
            res.status(200).send({
              message: "There are no new order",
            });
          }
        }
      );
    } else {
      res.status(500).send({
        message: "you don't have business",
      });
    }
  },
  accept: (req, res, next) => {
    try {
      if (req.user.workIn) {
        // if (req.body.ID.match(/^[0-9a-fA-F]{24}$/)) {
        Order.findOne({ _id: req.body.ID, orderState: "new" }).then((order) => {
          if (order) {
            order.orderState = "accepted";
            order.businessNotes = req.body.businessNotes;
            order.save();
            res.status(200).send({
              message: "order accepted",
              success: true,
            });
          } else {
            res.status(404).send({
              message: "order not found or acceptede",
              success: false,
            });
          }
        });
        // } else {
        //   res.status(500).send({
        //     message: "ID invalid",
        //     success: false,
        //   });
        // }
      } else {
        res.status(500).send({
          message: "you don't have business",
        });
      }
    } catch (error) {
      res.status(400).send({
        message: error, //&& "not valid order", // the && will send the value if the error was null
        success: false,
      });
    }
  },
  done: (req, res, next) => {
    try {
      if (req.user.workIn) {
        // if (req.body.ID.match(/^[0-9a-fA-F]{24}$/)) {
        Order.findOne({ _id: req.body.ID, orderState: "accepted" }).then(
          (order) => {
            if (order) {
              order.orderState = "done";
              order.businessNotes = req.body.businessNotes;
              order.save();
              Business.findOne({ _id: req.user.workIn }).then((business) => {
                if (business) {
                  business.balance = business.balance + order.subTotal;
                  business.save();
                }
              });
              res.status(200).send({
                message: "order done",
                success: true,
              });
            } else {
              res.status(404).send({
                message: "order not found or not accepted",
                success: false,
              });
            }
          }
        );
        // } else {
        //   res.status(500).send({
        //     message: "ID invalid",
        //     success: false,
        //   });
        // }
      } else {
        res.status(500).send({
          message: "you don't have business",
          success: false,
        });
      }
    } catch (error) {
      res.status(400).send({
        message: error, // && "not valid order", // the && will send the value if the error was null
        success: false,
      });
    }
  },
  cancel: (req, res, next) => {
    if (req.user.workIn) {
      // if (ID.test(req.body.ID)) {
      Order.findOne({ _id: req.body.ID, orderState: "accepted" }).then(
        (order) => {
          if (order) {
            order.orderState = "cenceled";
            order.businessNotes = req.body.businessNotes;
            order.save();
            res.status(200).send({
              message: "order cenceled",
              success: true,
            });
          } else {
            res.status(404).send({
              message: "order not found or rejected",
            });
          }
        }
      );
      // } else {
      //   res.status(500).send({
      //     message: "ID invalid",
      //   });
      // }
    } else {
      res.status(500).send({
        message: "you don't have business",
      });
    }
  },
  reject: (req, res, next) => {
    if (req.user.workIn) {
      // if (ID.test(req.body.ID)) {
      Order.findOne({ _id: req.body.ID, orderState: "new" }).then((order) => {
        if (order) {
          order.orderState = "rejected";
          order.businessNotes = req.body.businessNotes;
          order.save();
          res.status(200).send({
            message: "order rejected",
            success: true,
          });
        } else {
          res.status(404).send({
            message: "order not found or rejected",
          });
        }
      });
      // } else {
      //   res.status(500).send({
      //     message: "ID invalid",
      //   });
      // }
    } else {
      res.status(500).send({
        message: "you don't have business",
      });
    }
  },
  updateStatus: (req, res, next) => {
    if (req.user.workIn) {
      // if (ID.test(req.body.ID)) {
      Order.findOne({ _id: req.body.ID }).then((order) => {
        if (order) {
          order.orderState = req.body.status;
          order.save();
          res.status(200).send({
            message: "order status updated successfully",
            success: true,
          });
        } else {
          res.status(404).send({
            message: "order not found",
          });
        }
      });
      // } else {
      //   res.status(500).send({
      //     message: "ID invalid",
      //   });
      // }
    } else {
      res.status(500).send({
        message: "you don't have business",
      });
    }
  },
  showActiveOrder: (req, res, next) => {
    if (req.user.workIn) {
      Order.find({
        businessID: req.user.workIn,
        orderState: "accepted",
      }) // $ne mean except or not equal
        .then((order) => {
          if (order) {
            res.status(200).send(order);
          } else {
            res.status(200).send({
              message: "There are no active order",
            });
          }
        });
    } else {
      res.status(500).send({
        message: "you don't have business",
      });
    }
  },
};
