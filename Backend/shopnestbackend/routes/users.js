const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/e-commerce");

const productschema = mongoose.Schema({
  price: Number,
  BrandNames: String,
  productDescription: String,
  inStock: String,
  image: String
})

module.exports = mongoose.model("product", productschema);
