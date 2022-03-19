"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Item = new Schema({
  businessID: {
    type: mongoose.SchemaTypes.ObjectId,
    require: true,
    ref: "Business",
  },
  name: {
    type: String,
    require: true,
  },
  img: {
    type: Buffer,
    // contentType: String,
  },
  price: {
    type: Number,
    require: true,
  },
  discount: {
    type: Number,
    default: 0,
  },
  state: {
    type: String,
    default: "new",
  },
  status: {
    type: Boolean,
    default: true,
  },
});
const Table = new Schema({
  businessID: {
    type: mongoose.SchemaTypes.ObjectId,
    require: true,
    ref: "Business",
  },
  chairNumber: {
    type: Number,
    require: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
});
const Reservation = new Schema({
  tableID: {
    type: mongoose.SchemaTypes.ObjectId,
    require: true,
    ref: "Table",
  },
  chairNumber: {
    type: Number,
    require: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
});

exports.Item = mongoose.model("Item", Item);
exports.Table = mongoose.model("Table", Table);
exports.Reservation = mongoose.model("Reservation", Reservation);
