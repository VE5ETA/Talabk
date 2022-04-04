"use strict";
const Menu = require("../models/menu");
const qrcode = require("qrcode");
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
            const Menu = new Menu({
              businessID: req.user.workIn,
              UserName: req.body.UserName,
              name: req.body.name,
              logo: req.file.buffer,
              logoMimetype: req.file.mimetype,
            });

            // Menu.save() ? qrcode.toDataURL ❗ complate here

            res.status(200).send({
              message: "Menu created successfully",
              success: true,
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
  addItem: (req, res, next) => {},
  info: (req, res, next) => {},
  update: (req, res, next) => {},
  delete: (req, res, next) => {},
};
