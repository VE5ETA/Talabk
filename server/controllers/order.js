const { Order } = require("../models/Order");

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
    if (req.user.workIn) {
      if (orderid.test(req.body.orderID)) {
        Order.findOne({ _id: req.body.orderID, orderState: "new" }).then(
          (order) => {
            if (order) {
              order.orderState = "accepted";
              order.businessNotes = req.body.businessNotes;
              order.save();
              Business.findOne({ _id: req.user.workIn }).then((business) => {
                if (business) {
                  business.balance = business.balance + order.subTotal;
                  business.save();
                }
              });
              res.status(200).send({
                message: "order accepted",
                success: true,
              });
            } else {
              res.status(404).send({
                message: "order not found or acceptede",
              });
            }
          }
        );
      } else {
        res.status(500).send({
          message: "orderID invalid",
        });
      }
    } else {
      res.status(500).send({
        message: "you don't have business",
      });
    }
  },
  done: (req, res, next) => {
    if (req.user.workIn) {
      if (orderid.test(req.body.orderID)) {
        Order.findOne({ _id: req.body.orderID, orderState: "accepted" }).then(
          (order) => {
            if (order) {
              order.orderState = "done";
              order.businessNotes = req.body.businessNotes;
              order.save();
              res.status(200).send({
                message: "order done",
                success: true,
              });
            } else {
              res.status(404).send({
                message: "order not found or not accepted",
              });
            }
          }
        );
      } else {
        res.status(500).send({
          message: "orderID invalid",
        });
      }
    } else {
      res.status(500).send({
        message: "you don't have business",
      });
    }
  },
  reject: (req, res, next) => {
    if (req.user.workIn) {
      if (orderid.test(req.body.orderID)) {
        Order.findOne({ _id: req.body.orderID, orderState: "new" }).then(
          (order) => {
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
          }
        );
      } else {
        res.status(500).send({
          message: "orderID invalid",
        });
      }
    } else {
      res.status(500).send({
        message: "you don't have business",
      });
    }
  },
  updateStatus: (req, res, next) => {
    if (req.user.workIn) {
      if (orderid.test(req.body.orderID)) {
        Order.findOne({ _id: req.body.orderID }).then((order) => {
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
      } else {
        res.status(500).send({
          message: "orderID invalid",
        });
      }
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
