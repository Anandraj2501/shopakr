const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/e-commerce");

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