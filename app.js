const express = require("express");
require("dotenv").config();
const { connectDB } = require("./Server/DB/db.js");
const routes = require("./Server/Routes/routes");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(__dirname + "/public"));

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

app.use("/", routes);
const port = process.env.PORT || 3000;
const url = process.env.MONGO_URI;
const start = async () => {
  try {
    await connectDB(url);
    console.log("connected to db");
    app.listen(port, () => {
      console.log("server is running on port", port);
    });
  } catch (err) {
    console.log("error", err);
  }
};

start();
