const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let Station = new Schema(
  {
    Numero: {
      type: String,
      required: true,
    },
    Type: {
      type: String,
      required: true,
    },
    Nom: {
      type: String,
      required: true,
    },
    Transmission: {
      type: String,
      required: true,
    },
    Capacite: {
      type: String,
      required: true,
    },
    Bande: {
      type: String,
      required: true,
    },
    Configuration: {
      type: String,
      required: true,
    },
    Lat: {
      type: String,
      required: true,
    },
    Lng: {
      type: String,
      required: true,
    },
    Acceptance: {
      type: String,
      required: true,
    },
  },
  {
    collection: "station",
  }
);
module.exports = mongoose.model("Station", Station);
