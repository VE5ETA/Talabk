"use strict";
const { Business } = require("../models/business");

module.exports = {
  test: (req, res, next) => {
    res.send("hey you're an admin 😁");
  },
  adminTest: (req, res, next) => {
    try {
      res.status(200).send(true);
    } catch (error) {
      res.status(404).send({
        message: error,
        success: false,
      });
    }
  },
  // not working well 🔨
  showNewRequest: (req, res, next) => {
    Business.find({ businessStatus: false }).then((business) => {
      if (business) {
        res.status(200).send(business);
      } else {
        res.status(204).send({
          message: "There are no new requests",
        });
      }
    });
  },
  acceptBuz: (req, res, next) => {
    try {
      Business.updateOne(
        { _id: req.body.id },
        { $set: { businessStatus: true, businessState: "active" } }
      ).then((business) => {
        if (business) {
          res.status(200).send({
            message: "business request accepted successfully",
            success: true,
          });
        } else {
          res.status(404).send({
            message: "business not found",
            success: true,
          });
        }
      });
    } catch (err) {
      res.status(500).send(err);
    }
  },
  rejectBuz: (req, res, next) => {
    try {
      Business.updateOne(
        { _id: req.body.id },
        { $set: { businessState: "reject" } }
      ).then((business) => {
        if (business) {
          res.status(200).send({
            message: "business request rejected",
            success: true,
          });
        } else {
          res.status(404).send({
            message: "business not found",
            success: true,
          });
        }
      });
    } catch (err) {
      res.status(500).send(err);
    }
  },
  showActiveBuz: (req, res, next) => {
    Business.find({ businessState: "active" }).then((business) => {
      if (business) {
        res.status(200).send(business);
      } else {
        res.status(204).send({
          message: "There are no active business",
        });
      }
    });
  },
  showSuspensionBuz: (req, res, next) => {
    Business.find({ businessState: "suspension" }).then((business) => {
      if (business) {
        res.status(200).send(business);
      } else {
        res.status(204).send({
          message: "There are no suspension business",
        });
      }
    });
  },
};
