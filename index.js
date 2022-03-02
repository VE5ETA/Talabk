const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

if (process.env.NODE_ENV !== "production") {
  // Load environment variables from .env file in non prod environments
  require("dotenv").config();
}
require("./utils/connectdb");

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

app.get("/", (req, res) => {
  res.send({ status: "success" });
});

//Start the server in port 8081
console.log(require("crypto").randomBytes(64).toString("hex"));
const server = app.listen(process.env.PORT || 8081, () => {
  const port = server.address().port;

  console.log("App started at port:", port);
});