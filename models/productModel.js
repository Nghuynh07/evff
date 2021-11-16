const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    unique: true,
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['Fruits', 'Vegetables', 'Herbs'],
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    trim: true,
  },
  packaging: {
    type: String,
    required: [true, 'Packaging is required'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
  },
  imag: {
    type: String,
    required: [true, 'Image is required'],
  },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
