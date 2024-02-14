const mongoose = require("mongoose");

const username = encodeURIComponent("anand");
const password = encodeURIComponent("An@ndr@j@123");
mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.ma7aans.mongodb.net/e-commerce?retryWrites=true&w=majority`);
// mongoose.connect("mongodb://127.0.0.1:27017/e-commerce");

const CartSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "actualusers",
    },
    items: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "product"
        },
        quantity: {
            type: Number,
            defalut: 0
        },
        size: {
            type: String,
        },
        subTotal:{
            type: Number,
            default: 0
        }
    }]
})

const Cart = mongoose.model("cart",CartSchema);
module.exports = Cart;