"use strict";
const User = require("../models/user");
const { Business } = require("../models/business");
const { Order } = require("../models/Order");

module.exports = {
  createOrder: (req, res, next) => {
    const buzRegex = new RegExp(/^(\s\.\*\\)*[a-zA-Z0-9]{24,24}$/); // for business id
    const phoneRegex = new RegExp(
      /^(009665|9665|\+9665|05|5)(5|0|3|6|4|9|1|8|7)([0-9]{7})$/
    ); // for customer phone number

    if (!req.body.businessID || !buzRegex.test(req.body.businessID)) {
      res.status(500).send({
        name: "businessIdError",
        message: "business Id is invalid",
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
      Business.findById({ _id: req.body.businessID }).then((business) => {
        if (business) {
          const newOrder = new Order({
            businessID: req.body.businessID,
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
};

// for test in insomnia

// {
// 	"businessID": "622efea2adf5a46cc0611e73",
// 	"orderType": "sada",
// 	"customerNumber": "0555555555",
// 	"subTotal": 150,
// 	"items": [
// 		{
// 		"item1": "aa",
// 		"quantity": 1
// 	    },
// 		{
// 		"item2": "bb",
// 		"quantity": 5
// 		}
// 	],
// 	"notes": "aadsa1xzc cz"
// }
