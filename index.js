require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();

const formidableMiddleware = require("express-formidable");
const bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.json());

// DataBase config
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "error data base connection:"));
db.once("open", function () {
      console.log("Connected to data base");
});

app.get("/", (req, res) => {
      res.status(200).json("Bienvenue sur mon site infos");
});

app.listen(process.env.PORT, () => {
      console.log("Server has started on port " + process.env.PORT);
});
