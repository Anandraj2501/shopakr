const mongoose = require("mongoose");
const plm = require("passport-local-mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/e-commerce"); 

const userSchema = mongoose.Schema({
    username: String,
    password: String,
    email: String,
});

userSchema.plugin(plm);

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;