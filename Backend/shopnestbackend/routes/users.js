const mongoose = require("mongoose");
// mongoose.connect("mongodb://127.0.0.1:27017/e-commerce");
const username = encodeURIComponent("anand");
const password = encodeURIComponent("An@ndr@j@123");
mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.ma7aans.mongodb.net/e-commerce?retryWrites=true&w=majority`);

const productschema = mongoose.Schema({
  price: Number,
  BrandNames: String,
  productDescription: String,
  inStock: String,
  image: String
})

module.exports = mongoose.model("product", productschema);
