"use strict";
const { Business } = require("../models/business");
const { Order } = require("../models/order");
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
    } else if (
      req.body.tableNumber === "" &&
      req.body.orderType === "dining in"
    ) {
      res.status(500).send({
        name: "tableNumberError",
        message: "table number is required",
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
            tableNumber: req.body.tableNumber ? req.body.tableNumber : "",
            notes: req.body.notes,
            reservationInfo: req.body.reservationInfo,
            BusinessName: req.body.username,
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
            businessStatus: true,
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
        {
          $match: {
            status: true,
          },
        },
        {
          $lookup: {
            from: "items",
            localField: "_id",
            foreignField: "MenuID",
            as: "items",
          },
        },
      ]).then((menus) => {
        const x = menus.filter((m) => m.items[0]);
        const z = x.filter((m) => delete m.items);
        // let z = menus.pop()

        if (menus[0]) {
          res.status(200).send(z);
        } else {
          res.status(404).send({
            message: "no menu found",
            success: false,
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
        Menu.aggregate([
          {
            $match: {
              username: req.params.username,
              // status: true,
            },
          },
        ]).then((menu) => {
          // this will check if business is close or not
          if (menu[0].status) {
            if (menu[0]) {
              Item.aggregate([
                {
                  $match: {
                    MenuID: menu[0]?._id,
                  },
                },
              ]).then((items) => {
                if (items.length != 0) {
                  let allMenuData = { head: menu[0], body: items };
                  res.status(200).send(allMenuData);
                } else {
                  res.status(404).send({
                    message: "this menu don't have items",
                    success: false,
                  });
                }
              });
            } else {
              res.status(404).send({
                message: "didn't found business with the given name",
                success: false,
              });
            }
          } else {
            res.status(404).send({
              message: menu.state,
              success: false,
            });
          }
        });
        //this code below return images in buffer type , you will have bad times dealing with it in the  front-end 😞

        //------------------------------------------------------------------------------------------------------\\
        // Menu.findOne({ username: req.params.username }).then((menu) => {
        //   if (menu) {
        //     Item.find({ MenuID: menu._id }).then((item) => {
        //       if (item) {
        //         let allMenuData = { head: menu, body: item };
        //         res.status(200).send(allMenuData);
        //       } else {
        //         res.status(201).send({
        //           message: "this menu don't have items",
        //         });
        //       }
        //     });
        //   } else {
        //     res.status(404).send({
        //       message: "didn't found business with the given name",
        //     });
        //   }
        // });
        //------------------------------------------------------------------------------------------------------\\
      }
    } catch (error) {
      res.status(400).send({
        message: error,
        success: false,
      });
    }
  },
};
