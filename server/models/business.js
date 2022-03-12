"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const business = new Schema({
  tradeName: String,
  legalName: String,
  legalDocument: String,
  verified: Boolean,
});

module.exports = mongoose.model("business", business);
