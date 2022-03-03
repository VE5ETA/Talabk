"use strict";
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const passport = require("passport");

if (process.env.NODE_ENV !== "production") {
  // Load environment variables from .env file in non prod environments
  require("dotenv").config();
}
require("./utils/connectdb");
require("./controllers/JwtStrategy");
require("./controllers/LocalStrategy");

const router = require("./routes/index");

const app = express();

app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

//Add the client URL to the CORS policy

const whitelist = process.env.WHITELISTED_DOMAINS
  ? process.env.WHITELISTED_DOMAINS.split(",")
  : [];

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

//lucky guss
let x = require("crypto").randomBytes(64).toString("hex");
console.log(x);

//Start the server in port 8081
const server = app.listen(process.env.PORT || 8081, () => {
  const port = server.address().port;
  console.log("App started at port:", port);
});
