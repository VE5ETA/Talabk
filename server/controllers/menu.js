"use strict";
const { Menu } = require("../models/menu");
const { Item } = require("../models/menu");
const { Business } = require("../models/business");
const { generateQR } = require("../middlewares/generateQR");
module.exports = {
  create: (req, res, next) => {
    try {
      if (!req.body.UserName) {
        res.statusCode = 500;
        res.send({
          name: "UserNameError",
          message: "User Name is required",
        });
      } else if (!req.body.name) {
        res.statusCode = 500;
        res.send({
          name: "nameError",
          message: "name is required",
        });
      } else if (!req.file.buffer) {
        res.statusCode = 500;
        res.send({
          name: "logoError",
          message: "logo is required",
        });
      } else {
        Business.findOne({ ownerID: req.user._id }).then((business) => {
          if (business) {
            const newMenu = new Menu({
              businessID: req.user.workIn,
              UserName: req.body.UserName,
              name: req.body.name,
              logo: req.file.buffer,
              logoMimetype: req.file.mimetype,
            });
            // console.log(req.file.buffer);
            newMenu.save((err) => {
              if (err) {
                res.status(400).send({
                  message: err,
                  success: false,
                });
              } else {
                generateQR(req.body.UserName).then((qr) => {
                  const x = qr.split(",");
                  const base64string = x[1];
                  const buffer = Buffer.from(base64string, "base64");
                  newMenu.qrImg = buffer;
                  newMenu.save();
                });
                res.status(200).send({
                  message: "Menu created successfully",
                  success: true,
                });
              }
            });
          } else {
            res.status(500).send({
              message: "you don't have business",
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
  info: (req, res, next) => {},
  update: (req, res, next) => {},
  delete: (req, res, next) => {},
  addItem: (req, res, next) => {
    try {
      if (!req.body.MenuID) {
        res.statusCode = 500;
        res.send({
          name: "MenuIDError",
          message: "Menu ID is required",
        });
      } else if (!req.body.name) {
        res.statusCode = 500;
        res.send({
          name: "nameError",
          message: "name is required",
        });
      } else if (!req.file.buffer) {
        res.statusCode = 500;
        res.send({
          name: "logoError",
          message: "logo is required",
        });
      } else if (!req.body.price) {
        res.statusCode = 500;
        res.send({
          name: "priceError",
          message: "price is required",
        });
      } else {
        Menu.findOne({ _id: req.body.MenuID }).then((menu) => {
          if (menu && menu.businessID === req.user._id) {
            const newItem = new Item({
              MenuID: menu._id,
              name: req.body.name,
              img: req.file.buffer,
              imgMimetype: req.file.mimetype,
              price: req.body.price,
            });
            newItem.save((err) => {
              if (err) {
                res.status(400).send({
                  message: err,
                  success: false,
                });
              } else {
                res.status(200).send({
                  message: "Item added to the Menu successfully",
                  success: true,
                });
              }
            });
          } else {
            res.status(401).send({
              message: "you are not authorized to make this request",
              success: false,
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
  getItem: (req, res, next) => {},
  updateItem: (req, res, next) => {},
  deleteItem: (req, res, next) => {},
  menuLogo: (req, res, next) => {
    Menu.findOne({ businessID: req.user.workIn }).then((menu) => {
      if (menu) {
        const x = menu.logo;
        // console.log(x);
        res.set("Content-Type", menu.logoMimetype);
        res.send(menu.logo);
      } else {
        res.status(404).send({
          message: "logo not found",
        });
      }
    });
  },
  menuQR: (req, res, next) => {
    Menu.findOne({ businessID: req.user.workIn }).then((menu) => {
      if (menu) {
        res.set("Content-Type", "image/png");
        res.status(200).send(menu.qrImg);
      } else {
        res.status(404).send({
          message: "QR not found",
        });
      }
    });
  },
};
