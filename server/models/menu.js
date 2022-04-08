"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const uniqueValidator = require("mongoose-unique-validator");

const Menu = new Schema({
  businessID: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
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
    uniqueCaseInsensitive: true,
    // lowercase: true, //removed to use uniqueCaseInsensitive ❗⛔
  },
  name: {
    type: String,
    required: true,
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
    required: true,
    ref: "Menu",
  },
  name: {
    type: String,
    required: true,
  },
  img: {
    type: Buffer,
    // contentType: String,
  },
  price: {
    type: Number,
    required: true,
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
    required: true,
    ref: "Menu",
  },
  chairNumber: {
    type: Number,
    required: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
});
const Reservation = new Schema({
  tableID: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
    ref: "Table",
  },
  start: {
    type: Date,
    required: true,
  },
  end: {
    type: Date,
    required: true,
  },
  // state: {
  //   type: String,
  //   default: "new",
  // },
  OrderID: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
    ref: "Order",
  },
});

Menu.plugin(uniqueValidator, {
  message: "Error, expected {PATH} to be unique. {VALUE} is already used!",
});

exports.Menu = mongoose.model("Menu", Menu);
exports.Item = mongoose.model("Item", Item);
exports.Table = mongoose.model("Table", Table);
exports.Reservation = mongoose.model("Reservation", Reservation);
