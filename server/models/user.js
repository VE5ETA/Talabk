"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const passportLocalMongoose = require("passport-local-mongoose");

const Session = new Schema({
  refreshToken: {
    type: String,
    default: "",
  },
});

const User = new Schema({
  name: {
    type: String,
    required: [true, "can't be blank"],
  },
  userName: {
    type: String,
    required: [true, "can't be blank"],
    minLength: [3, "can't be less then 3"],
    maxLength: [33, "can't be more then 33"],
    match: [/^(\w){3,33}$/, "is invalid"],
    trim: true,
    unique: true,
    lowercase: true,
  },
  email: {
    type: String,
    required: [true, "can't be blank"],
    match: [/\S+@\S+\.\S+/, "is invalid"],
    trim: true,
    lowercase: true,
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
  workIn: {
    type: mongoose.SchemaTypes.ObjectId,
  },
  authStrategy: {
    type: String,
    default: "local",
  },
  points: {
    type: Number,
    default: 50,
  },
  refreshToken: {
    type: [Session],
  },
});

User.set("toJSON", {
  transform: (doc, ret, options) => {
    delete ret.refreshToken;
    return ret;
  },
});

User.plugin(passportLocalMongoose, {
  usernameField: "userName",
});

module.exports = mongoose.model("User", User);
