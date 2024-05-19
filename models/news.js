const mongoose = require("mongoose");

const NewsSchema = new mongoose.Schema(
  {
    headline: {
      type: String,
      required: true,
      unique: true,
    },
    short_description: {
      type: String,
      required: true,
      unique: true,
    },
    link: {
      type: String,
      required: true,
      unique: true,
    },
    category: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("news", NewsSchema);