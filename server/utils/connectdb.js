"use strict";
const mongoose = require("mongoose");
const url =
  process.env.NODE_ENV === "live"
    ? process.env.ONLAIN_MONGO_DB_CONNECTION_STRING
    : process.env.MONGO_DB_CONNECTION_STRING; //changed the db name for validation issues 🧰
const connect = mongoose.connect(
  url
  //     ,{
  //   useNewUrlParser: true,
  //   useUnifiedTopology: true,
  //         useCreateIndex: true,
  //     }
);

connect
  .then((db) => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.log(err);
  });
