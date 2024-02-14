const mongoose = require("mongoose");
const plm = require("passport-local-mongoose");

// mongoose.connect("mongodb://127.0.0.1:27017/e-commerce");
 const username = encodeURIComponent("anand");
const password = encodeURIComponent("An@ndr@j@123");
mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.ma7aans.mongodb.net/e-commerce?retryWrites=true&w=majority`);

const userSchema = mongoose.Schema({
    username: String,
    password: String,
    email: String,
});

userSchema.plugin(plm);

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;