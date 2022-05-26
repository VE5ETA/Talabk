"use strict";
const { Business, BuzDocs } = require("../models/business");
const ObjectId = require("mongoose").Types.ObjectId;
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
  // not working well 🔨 ------ fixed ✅
  showNewRequest: (req, res, next) => {
    try {
      Business.aggregate([
        {
          $match: {
            businessStatus: false,
          },
        },
        // {
        //   $lookup: {
        //     from: "buzdocs",
        //     localField: "_id",
        //     foreignField: "businessID",
        //     as: "LegalDocs",
        //   },
        // },
        // {
        //   $unwind: {
        //     path: "$LegalDocs",
        //     preserveNullAndEmptyArrays: true,
        //   },
        // },
        {
          $lookup: {
            from: "users",
            localField: "_id",
            foreignField: "workIn",
            as: "ownerID",
          },
        },
        {
          $unwind: {
            path: "$ownerID",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $unset: [
            "ownerID.salt",
            "ownerID.hash",
            "ownerID.authStrategy",
            "ownerID.refreshToken",
            "ownerID.__v",
            "LegalDocs.__v",
            "__v",
          ],
        },
      ]).then((business) => {
        if (business[0]) {
          res.status(200).send(business);
        } else {
          res.status(404).send({
            message: "There are no new requests",
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

    // Business.find({ businessStatus: false }).then((business) => {
    //   if (business) {
    //     res.status(200).send(business);
    //   } else {
    //     res.status(204).send({
    //       message: "There are no new requests",
    //     });
    //   }
    // });
  },
  getLegalDoc: (req, res, next) => {
    try {
      BuzDocs.findOne({ businessID: req.body.ID }).then((buzDocs) => {
        if (buzDocs) {
          res.set("Content-Type", "application/pdf");
          res.send(buzDocs.pdf);
        } else {
          res.status(404).send({
            message: "file not found",
          });
        }
      });
      // BuzDocs.aggregate([
      //   {
      //     $match: {
      //       businessID: ObjectId(req.body.ID),
      //     },
      //   },
      //   // {
      //   //   $lookup: {
      //   //     from: "buzdocs",
      //   //     localField: "_id",
      //   //     foreignField: "businessID",
      //   //     as: "LegalDocs",
      //   //   },
      //   // },
      //   // {
      //   //   $unwind: {
      //   //     path: "$LegalDocs",
      //   //     preserveNullAndEmptyArrays: true,
      //   //   },
      //   // },
      //   // {
      //   //   $lookup: {
      //   //     from: "users",
      //   //     localField: "_id",
      //   //     foreignField: "workIn",
      //   //     as: "ownerID",
      //   //   },
      //   // },
      //   // {
      //   //   $unwind: {
      //   //     path: "$ownerID",
      //   //     preserveNullAndEmptyArrays: true,
      //   //   },
      //   // },
      //   // {
      //   //   $unset: [
      //   //     "ownerID.salt",
      //   //     "ownerID.hash",
      //   //     "ownerID.authStrategy",
      //   //     "ownerID.refreshToken",
      //   //     "ownerID.__v",
      //   //     "LegalDocs.__v",
      //   //     "__v",
      //   //   ],
      //   // },
      // ]).then((doc) => {
      //   if (doc[0]) {
      //     res.set("Content-Type", "application/pdf");
      //     res.send(doc[0].pdf);
      //     // res.status(200).send(doc[0]);
      //   } else {
      //     res.status(404).send({
      //       message: "There's are no releted document",
      //       success: false,
      //     });
      //   }
      // });
    } catch (error) {
      res.status(400).send({
        message: error,
        success: false,
      });
    }

    // Business.find({ businessStatus: false }).then((business) => {
    //   if (business) {
    //     res.status(200).send(business);
    //   } else {
    //     res.status(204).send({
    //       message: "There are no new requests",
    //     });
    //   }
    // });
  },
  acceptBuz: (req, res, next) => {
    try {
      Business.updateOne(
        { _id: req.body.id },
        { $set: { businessStatus: true, businessState: "accepted" } }
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
        { $set: { businessStatus: false, businessState: "rejected" } }
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
    Business.find({ businessStatus: true }).then((business) => {
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
