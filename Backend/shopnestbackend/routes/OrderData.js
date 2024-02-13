const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/e-commerce");

// Define the Order schema
const orderSchema = new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    orderTotal: {
      type: Number,
      required: true
    },
    items: [{
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
      },
      quantity: {
        type: Number,
        required: true
      },
      size: {
        type: String,
        required: true
      }
    }],
    razorpayOrderId: {
      type: String,
      required: true
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'completed'],
      default: 'pending'
    }
  }, { timestamps: true });

  const Order = mongoose.model('Order', orderSchema);
  module.exports = Order;