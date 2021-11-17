const Product = require('./../models/productModel');

exports.getAllProducts = async (req, res) => {
  try {
    console.log(req.query);
    //BUILD QUERY
    //Here we are making a hard copy of the req.query object using destructuring then excludes all the fields using array; these fields if presented in the query it will get removed from the query object b/c these are features that we want to chain on the query. Element in the excludedFields array are not part of the model; therefore, if these present, we want to ignore/delete it and only query everything else basically whatever that is in the model that we're trying to query.
    const queryObj = { ...req.query };
    const excludeFields = ['page', 'sort', 'limit', 'fields'];
    excludeFields.forEach((el) => delete queryObj[el]);
    //using regular expression to replace all of these abbreviation to have $ sign in front of it so that we can query. Then the call back function is to replace all that matches in the Regex, Then JSON.parse() basically to return the string back to object
    const queryStr = JSON.stringify(queryObj).replace(
      /\b(gte|gt|lte|lt)\b/g,
      (match) => `$${match}`
    );
    console.log(JSON.parse(queryStr));
    // {difficulty :'easy', duration: {$gte: 5}}

    //not querying right away b/c we want to chain other queries before executing it; since find() returns a query object, we setting it as a query variable then later await all queries that we are chaining at the same time. If we await the products right after the first query, then it would stop at the first query and not chaining the rest. Ideally we want to chain all the queries object that we set to query.
    const query = Product.find(JSON.parse(queryStr));
    //EXECUTE QUERY
    const products = await query;

    //below is one way to query. b/c find() method returns a query object so we can query right in there by chaining .where.equals etc... more information on the mmongoDB query section. The find() method and long with other query methods are actually a prototype of the query class.
    // const query = Product.find()
    //   .where('category')
    //   .equals('Vegetables')
    //   .where('packaging')
    //   .equals('lb')
    //   .where('price')
    //   .lte(2.5);
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
