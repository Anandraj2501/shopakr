const mongoose = require("mongoose");
const plm = require ("passport-local-mongoose");

// mongoose.connect("mongodb://127.0.0.1:27017/e-commerce"); 
const username = encodeURIComponent("anand");
const password = encodeURIComponent("An@ndr@j@123");
mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.ma7aans.mongodb.net/e-commerce?retryWrites=true&w=majority`);

const ECommerceUser = mongoose.Schema({
    username: String,
    password: String,
    email: String,
})
 
ECommerceUser.plugin(plm);

const actualUser = mongoose.model("actualusers",ECommerceUser);

module.exports = actualUser;