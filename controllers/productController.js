const AppError = require('../utils/appError');
const Product = require('./../models/productModel');
const APIFeatures = require('./../utils/apifeatures');
const catchAsync = require('./../utils/catchAsync');
exports.aliasTopTours = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-price, category';
  req.query.fields = 'name, price, packaging';
  next();
};

exports.getAllProducts = catchAsync(async (req, res, next) => {
  //EXECUTE QUERY
  const features = new APIFeatures(Product.find(), req.query)
    .filter()
    .sort()
    .limit()
    .pagination();
  const products = await features.query;

  //SEND RESPONSE
  res.status(200).json({
    status: 'Success',
    length: products.length,
    data: {
      products,
    },
  });
});

exports.createProduct = catchAsync(async (req, res, next) => {
  const newProduct = await Product.create(req.body);
  res.status(201).json({
    status: 'Success',
    data: {
      newProduct,
    },
  });
});
exports.getOneProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new AppError('No product found with that ID', 404));
  }
  res.status(200).json({
    status: 'Success',
    data: {
      product,
    },
  });
});

exports.updateOneProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!product) {
    return next(new AppError('No product found with that ID', 404));
  }
  res.status(200).json({
    status: 'Success',
    data: {
      product,
    },
  });
});

exports.deleteOneProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  res.status(204).json({
    status: 'Success',
    data: null,
  });
  if (!product) {
    return next(new AppError('No product found with that ID', 404));
  }
});

exports.getProductsStats = catchAsync(async (req, res, next) => {
  const stats = await Product.aggregate([
    {
      $match: { price: { $lte: 2.5 } },
    },
    {
      $group: {
        _id: { $toUpper: '$category' },
        totalItem: { $sum: 1 },
        sumPrice: { $sum: '$price' },
        avgPrice: { $avg: '$price' },
        minPrice: { $min: '$price' },
        maxPrice: { $max: '$price' },
      },
    },
    {
      $sort: { _id: 1 },
    },
    {
      $match: {
        _id: { $ne: 'FRUITS' },
      },
    },
  ]);
  console.log(stats);
  res.status(200).json({
    status: 'Success',
    size: stats.length,
    data: stats,
  });
});
