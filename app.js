const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const url = process.env.uri;
const app = express(); //start the express server
const authToken = require("./middleware/authToken");

var cors = require("cors");

app.use(cors()); // Use this after the variable declaration

mongoose
  .connect(url, {
    useNewUrlParser: true,

    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected..");
  })
  .catch((err) => {
    console.log("error in connection", err);
  }); //connext to db





app.use(express.json());
const userRouter = require("./routes/Users");
app.use("/users", authToken, userRouter);

const authRouter = require("./routes/auth");
app.use("/", authRouter);

const urlShortRouter = require("./routes/urlShortener");
app.use("/", urlShortRouter);


const PORT = 9000;
app.listen(PORT, () => {
  console.log("server started");
});
