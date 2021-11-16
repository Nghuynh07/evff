const Product = require('./../models/productModel');

exports.getAllProducts = async (req, res) => {
  try {
    console.log(req.query);

    // const products = await Product.find()
    //   .where('category')
    //   .equals('Vegetables')
    //   .where('packaging')
    //   .equals('lb')
    //   .where('price')
    //   .lte(2.5);

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
      message: 'Opps something went wrong while you are doing this',
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
      message: 'Opps something went wrong while you are doing this',
    });
  }
};
