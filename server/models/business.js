"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BusinessLegalDocs = new Schema({});

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
    default: false, // or active
  },
  businessState: {
    type: String,
    default: "suspension", // or active
  },
  balance: {
    type: String,
  },
});

module.exports = mongoose.model("Business", Business);
