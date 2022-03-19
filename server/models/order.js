"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Order = new Schema({
  businessID: {
    type: mongoose.SchemaTypes.ObjectId,
    require: true,
    ref: "Business",
  },
  orderDate: {
    type: Date,
    default: () => Date.now(),
    immutable: true,
  },
  orderType: {
    type: String,
    require: true,
  },
  orderState: {
    type: String,
    default: "new",
  },
  customerNumber: {
    type: String,
    require: true,
  },
  subTotal: {
    type: Number,
  },
  items: {
    type: Array,
    require: true,
  },
  // quantity: {
  //   type: Number,
  // },
  notes: {
    type: String,
  },
  businessNotes: {
    type: String,
  },
});

exports.Order = mongoose.model("Order", Order);
