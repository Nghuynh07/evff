const mongoose = require('mongoose');
// const { ObjectId } = mongoose.Schema;

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    category: {
      type: String,
      enum: ['Fruits', 'Vegetables', 'Herbs', 'Eggs', 'Dairy', 'Poultry'],
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
    },
    packaging: {
      type: String,
      required: [true, 'Packaging is required'],
      trim: true,
    },
    photo: {
      type: String,
      default: 'default.jpg',
    },
  },
  { timestamps: true },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
