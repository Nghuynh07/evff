const globalHandlers = require('./globalHandlers');
const Product = require('./../models/productModel');

exports.getAllProducts = globalHandlers.getAll(Product);
exports.createProduct = globalHandlers.createOne(Product);
exports.getOneProduct = globalHandlers.getOne(Product);
exports.updateOneProduct = globalHandlers.updateOne(Product);
exports.deleteOneProduct = globalHandlers.deleteOne(Product);
