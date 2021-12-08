const Category = require('./../models/categoryModel');
const globalHandlers = require('./globalHandlers');

exports.createCat = globalHandlers.createOne(Category);
