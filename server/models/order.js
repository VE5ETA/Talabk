"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Order = new Schema({
  businessID: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
    ref: "Business",
  },
  reservationInfo: {
    type: Object,
  },
  BusinessName: {
    type: String,
  },
  tableNumber: {
    type: String,
  },
  orderDate: {
    type: Date,
    default: () => Date.now(),
    immutable: true,
  },
  orderType: {
    type: String,
    required: true,
  },
  orderState: {
    type: String,
    default: "new",
  },
  customerNumber: {
    type: String,
    required: true,
  },
  subTotal: {
    type: Number,
  },
  items: {
    type: Object,
    required: true,
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
