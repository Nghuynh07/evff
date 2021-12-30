const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const cartItemSchema = new mongoose.Schema(
  {
    products: {
      type: ObjectId,
      ref: 'Product',
    },
    name: String,
    price: Number,
    count: Number,
  },
  { timestamps: true }
);

const CartItem = mongoose.model('CartItem', cartItemSchema);

const orderSchema = new mongoose.Schema(
  {
    products: [cartItemSchema],
    transaction: {},
    amount: { type: Number },
    address: String,
    status: {
      type: String,
      default: 'Not Processed',
      enum: [
        'Not Processed',
        'Processing',
        'Shipping',
        'Delivered',
        'Cancelled',
      ],
    },
    updated: Date,
    user: {
      type: ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

const Order = mongoose.model('Order', orderSchema);

module.exports = { CartItem, Order };
