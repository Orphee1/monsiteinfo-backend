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

// Loading models
const Picture = require("./Picture");

// Middleware import
const uploadPicture = require("./UploadPicture");

// Routes =======================================

app.get("/", (req, res) => {
      res.status(200).json("Bienvenue sur mon site infos");
});

// Route create picture =========================

app.post(
      "/picture/publish",
      formidableMiddleware(),
      uploadPicture,
      async (req, res) => {
            // res.status(200).json({ message: "route create picture OK" });
            console.log("route create picture OK");

            try {
                  const name = req.fields.name;
                  const picture = new Picture({ name });
                  picture.url = req.pictures;
                  await picture.save();
                  res.status(200).json(picture);
                  console.log("Upload picture OK");
            } catch (error) {
                  console.error(error);
                  res.status(400).json({ message: error.message });
            }
      }
);

// Route create picture =========================

app.get("/picture", async (req, res) => {
      // res.status(200).json({ message: "route read picture OK" });
      console.log("route read picture OK");
      try {
            const picture = await Picture.find();
            if (picture) {
                  res.status(200).json(picture);
                  console.log("read picture OK");
            } else {
                  res.status(404).json({ message: "Image not found" });
            }
      } catch (error) {
            console.error(error);
            res.status(400).json({ message: error.message });
      }
});

app.listen(process.env.PORT, () => {
      console.log("Server has started on port " + process.env.PORT);
});
