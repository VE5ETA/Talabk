"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Menu = new Schema({
  businessID: {
    type: mongoose.SchemaTypes.ObjectId,
    require: true,
    ref: "Business",
  },
  UserName: {
    // ID
    type: String,
    required: [true, "username can't be blank"],
    minLength: [3, "can't be less then 3"],
    maxLength: [33, "can't be more then 33"],
    match: [/^(\w){3,33}$/, "is invalid"],
    trim: true,
    unique: true,
    lowercase: true,
  },
  name: {
    type: String,
    require: true,
  },
  logo: {
    type: Buffer,
  },
  logoMimetype: {
    type: String,
  },
  qrImg: {
    type: Buffer,
    // contentType: String,
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

const Item = new Schema({
  MenuID: {
    type: mongoose.SchemaTypes.ObjectId,
    require: true,
    ref: "Menu",
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
  // discount: {
  //   type: Number,
  //   default: 0,
  // },
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
  MenuID: {
    type: mongoose.SchemaTypes.ObjectId,
    require: true,
    ref: "Menu",
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
  start: {
    type: Date,
    require: true,
  },
  end: {
    type: Date,
    require: true,
  },
  // state: {
  //   type: String,
  //   default: "new",
  // },
  OrderID: {
    type: mongoose.SchemaTypes.ObjectId,
    require: true,
    ref: "Order",
  },
});

exports.Menu = mongoose.model("Menu", Menu);
exports.Item = mongoose.model("Item", Item);
exports.Table = mongoose.model("Table", Table);
exports.Reservation = mongoose.model("Reservation", Reservation);
