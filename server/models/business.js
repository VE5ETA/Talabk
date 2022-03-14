"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BuzDocs = new Schema({
  businessID: {
    // from Business collection
    type: mongoose.SchemaTypes.ObjectId,
    require: true,
    ref: "Business",
  },
  pdf: {
    type: Buffer,
    // contentType: String,
  },
});

const Business = new Schema({
  ownerID: {
    // from user collection
    type: mongoose.SchemaTypes.ObjectId,
    require: true,
    ref: "User",
  },
  tradeName: {
    type: String,
    require: true,
    unique: true,
  },
  legalName: {
    type: String,
    require: true,
  },
  businessType: {
    // like restaurant, coffee, ...
    type: String,
  },
  createdAt: {
    type: Date,
    default: () => Date.now(),
    immutable: true,
  },
  updatedAt: {
    type: Date,
    default: () => Date.now(),
  },
  businessStatus: {
    type: Boolean,
    default: false,
  },
  businessState: {
    type: String,
    default: "suspension", // or active
  },
  LegalDocs: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "BuzDocs",
  },
  balance: {
    type: String,
  },
});

exports.BuzDocs = mongoose.model("BuzDocs", BuzDocs);
exports.Business = mongoose.model("Business", Business);
