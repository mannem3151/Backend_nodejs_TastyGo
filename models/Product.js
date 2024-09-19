const mongoose = require("mongoose");
//category,image,bestseller,description
const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  category: {
    type: [String], // Array of strings
    enum: ["veg", "non-veg"], // Enum for allowed values
  },
  image: {
    type: String,
  },
  bestSeller: {
    type: String,
  },
  description: {
    type: String,
  },
  firm: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Firm",
  },
});
const Product = mongoose.model("product", productSchema);
module.exports = Product;
