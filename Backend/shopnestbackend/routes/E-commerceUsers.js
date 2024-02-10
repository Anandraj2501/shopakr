const mongoose = require("mongoose");
const plm = require ("passport-local-mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/e-commerce"); 

const ECommerceUser = mongoose.Schema({
    username: String,
    password: String,
    email: String,
})

ECommerceUser.plugin(plm);

const actualUser = mongoose.model("actualusers",ECommerceUser);

module.exports = actualUser;