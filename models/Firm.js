const mongoose = require("mongoose");

const firmSchema = new mongoose.Schema({
  firmName: {
    type: String,
    required: true,
    unique: true,
  },
  area: {
    type: String,
    required: true,
  },
  category: {
    type: [String], // Array of strings
    enum: ["veg", "non-veg"], // Enum for allowed values
  },
  region: {
    type: [String], // Array of strings
    enum: ["south-indian", "north-indian", "chinese", "bakery"], // Enum for allowed values
  },
  offer: {
    type: String,
  },
  image: {
    type: String,
  },
  vendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vendor",
  },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
});

const Firm = mongoose.model("Firm", firmSchema);
module.exports = Firm;
