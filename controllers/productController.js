const Product = require('./../models/productModel');
const APIFeatures = require('./../utils/apifeatures');
exports.aliasTopTours = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-price, category';
  req.query.fields = 'name, price, packaging';
  next();
};

exports.getAllProducts = async (req, res) => {
  try {
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
  } catch (err) {
    res.status(404).json({
      status: 'Failed',
      message: 'Unable to locate what you are trying to search',
    });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    res.status(201).json({
      status: 'Success',
      data: {
        newProduct,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'Failed',
      message: 'Invalid data sent!',
    });
  }
};
exports.getOneProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json({
      status: 'Success',
      data: {
        product,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'Failed',
      message: 'Unable to locate the object you are requesting',
    });
  }
};

exports.updateOneProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: 'Success',
      data: {
        product,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'Failed',
      message: 'Something went wrong while you are doing this',
    });
  }
};

exports.deleteOneProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'Success',
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      status: 'Failed',
      message: 'Something went wrong while you are doing this',
    });
  }
};

exports.getProductsStats = async (req, res) => {
  try {
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
  } catch (err) {
    res.status(400).json({
      status: 'Failed',
      message: 'Something went wrong while you are doing this',
    });
  }
};
