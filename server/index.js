"use strict";
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const passport = require("passport");

// if (process.env.NODE_ENV !== "production") {
//this will run by defualt
// Load environment variables from .env file in non prod environments
require("dotenv").config();
// }
require("./utils/connectdb");
require("./middlewares/JwtStrategy");
require("./middlewares/LocalStrategy");
require("./middlewares/authenticate");

const router = require("./routes/index");

const app = express();

app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

//Add the client URL to the CORS policy

const whitelist =
  process.env.NODE_ENV !== "live"
    ? process.env.WHITELISTED_DOMAINS.split(" ")
    : [
        "http://" +
          process.env.CODESPACE_NAME +
          "-" +
          process.env.PORT +
          ".githubpreview.dev",
        "https://" +
          process.env.CODESPACE_NAME +
          "-" +
          process.env.PORT +
          ".githubpreview.dev",
        "http://" +
          process.env.CODESPACE_NAME +
          "-" +
          process.env.CLIENT_PORT +
          ".githubpreview.dev",
        "https://" +
          process.env.CODESPACE_NAME +
          "-" +
          process.env.CLIENT_PORT +
          ".githubpreview.dev",
        "http://" +
          process.env.CODESPACE_NAME +
          "-" +
          process.env.CUSTOMER_PORT +
          ".githubpreview.dev",
        "https://" +
          process.env.CODESPACE_NAME +
          "-" +
          process.env.CUSTOMER_PORT +
          ".githubpreview.dev",
      ];

console.log(whitelist);

const corsOptions = {
  origin(origin, callback) {
    //here
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },

  credentials: true,
};
app.use(cors(corsOptions));

app.use(passport.initialize());
app.use("/", router);

app.use(cors(corsOptions));

app.use(passport.initialize());
app.use("/", router);

//Start the server in port 8081
const server = app.listen(process.env.PORT || 8081, () => {
  const port = server.address().port;
  console.log("App started at port:", port);
});
