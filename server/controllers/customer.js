"use strict";
const { Business } = require("../models/business");
const { Order } = require("../models/Order");
const { Menu } = require("../models/menu");
const { Item } = require("../models/menu");

module.exports = {
  createOrder: (req, res, next) => {
    const phoneRegex = new RegExp(
      /^(009665|9665|\+9665|05|5)(5|0|3|6|4|9|1|8|7)([0-9]{7})$/
    ); // for customer phone number

    if (!req.body.ID) {
      res.status(500).send({
        name: "IDError",
        message: "business ID is invalid",
      });
    } else if (!req.body.orderType) {
      res.status(500).send({
        name: "orderTypeError",
        message: "order type is required",
      });
    } else if (
      !req.body.customerNumber ||
      !phoneRegex.test(req.body.customerNumber)
    ) {
      res.status(500).send({
        name: "customerNumberError",
        message: "phone number is invalid",
      });
    } else if (!req.body.items || typeof req.body.items !== "object") {
      console.log(typeof req.body.items);
      res.status(500).send({
        name: "itemsError",
        message: "the order must have one items at least",
      });
    } else if (typeof req.body.subTotal !== "number") {
      res.status(500).send({
        name: "subTotalError",
        message: "subTotal is invalid",
      });
    } else {
      Business.findById({ _id: req.body.ID }).then((business) => {
        if (business) {
          const newOrder = new Order({
            businessID: req.body.ID,
            orderType: req.body.orderType,
            customerNumber: req.body.customerNumber,
            subTotal: req.body.subTotal,
            items: req.body.items,
            notes: req.body.notes,
          });

          newOrder.save((err, result) => {
            if (err) {
              console.log(err);
            } else {
              res.status(200).send({
                message: "order was created successfully",
                success: true,
              });
            }
          });
        } else {
          res.status(404).send({
            message: "business not found",
          });
        }
      });
    }
  },
  editOrder: (req, res, next) => {
    Order.findOne({ _id: req.body.ID }).then((order) => {
      if (order) {
        if (order.orderState === "new") {
          try {
            Order.updateOne(
              { _id: req.body.ID },
              { $set: { items: req.body.items } }
            ).then((order) => {
              if (order) {
                res.status(200).send({
                  message: "order updated successfully",
                  success: true,
                });
              } else {
                res.status(404).send({
                  message: "order not found",
                });
              }
            });
          } catch (err) {
            res.status(500).send(err);
          }
        } else {
          // 406 => Not Acceptable
          res.status(406).send({
            message: "can't edit order after accepted from business",
          });
        }
      } else {
        res.status(404).send({
          message: "order not found",
        });
      }
    });
  },
  cancelOrder: (req, res, next) => {
    Order.findOne({ _id: req.body.ID }).then((order) => {
      if (order) {
        if (order.orderState === "new") {
          try {
            Order.updateOne(
              { _id: req.body.ID },
              { $set: { orderState: "canceled" } }
            ).then((order) => {
              if (order) {
                res.status(200).send({
                  message: "order cancelled successfully",
                  success: true,
                });
              } else {
                res.status(404).send({
                  message: "order not found",
                });
              }
            });
          } catch (err) {
            res.status(500).send(err);
          }
        } else {
          // 406 => Not Acceptable
          res.status(406).send({
            message: "can't cancel order after accepted from business",
          });
        }
      } else {
        res.status(404).send({
          message: "order not found",
        });
      }
    });
  },
  getOrder: (req, res, next) => {
    Order.find({ customerNumber: req.body.customerNumber }).then((order) => {
      if (order.length != 0) {
        res.status(200).send(order);
      } else {
        res.status(404).send({
          message: "no orders found",
        });
      }
    });
  },
  showStores: (req, res, next) => {
    try {
      Business.aggregate([
        {
          $match: {
            businessState: "active",
          },
        },
        {
          $lookup: {
            from: "menus",
            localField: "_id",
            foreignField: "businessID",
            as: "menu",
          },
        },
        {
          $unwind: {
            path: "$menu",
          },
        },
        {
          $group: {
            _id: "$menu",
          },
        },
        {
          $replaceRoot: {
            newRoot: "$_id",
          },
        },
      ]).then((menus) => {
        if (menus) {
          res.status(200).send(menus);
        } else {
          res.status(404).send({
            message: "no menu found",
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
  fullmenu: (req, res, next) => {
    try {
      if (!req.params.username) {
        res.status(500).send({
          message: "username is required",
        });
      } else {
        Menu.findOne({ username: req.params.username }).then((menu) => {
          if (menu) {
            Item.find({ MenuID: menu._id }).then((item) => {
              if (item) {
                let allMenuData = { head: menu, body: item };
                res.status(200).send(allMenuData);
              } else {
                res.status(201).send({
                  message: "this menu don't have items",
                });
              }
            });
          } else {
            res.status(404).send({
              message: "didn't found business with the given name",
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
};
