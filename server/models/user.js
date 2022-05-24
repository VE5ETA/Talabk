"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const passportLocalMongoose = require("passport-local-mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Session = new Schema({
  refreshToken: {
    type: String,
    default: "",
  },
});

const User = new Schema({
  name: {
    type: String,
    required: [true, "name can't be blank"],
    match: [/^(\s)*[a-zA-Zء-ي]+(?:[-'\s][a-zA-Zء-ي]*)*(\s)*$/, "is invalid"],
    trim: true, // returned ✔
  },
  username: {
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
  email: {
    type: String,
    required: [true, "email can't be blank"],
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
    ref: "Business",
  },
  authStrategy: {
    type: String,
    default: "local",
  },
  // points: {
  //   type: Number,
  //   default: 50,
  // },
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
  usernameField: "username",
  usernameCaseInsensitive: true,
});
User.plugin(uniqueValidator, {
  message: "Error, expected {PATH} to be unique. {VALUE} is already used!",
});

module.exports = mongoose.model("User", User);
