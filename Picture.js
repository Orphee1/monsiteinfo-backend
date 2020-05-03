const mongoose = require("mongoose");

const Picture = mongoose.model("InfoPicture", {
      name: {
            type: String,
            required: true,
      },
      url: {
            type: String,
            required: true,
      },
});

module.exports = Picture;
