const fs = require('fs');

const products = JSON.parse(
  fs.readFileSync(`${__dirname}/data/tours-simple.json`)
);

exports.checkID = (req, res, next, val) => {
  console.log(`Product id: ${val}`);
  if (req.params.id * 1 > products.length) {
    return res.status(404).json({
      status: 'Failed',
      message: 'Invalid Id',
    });
  }
  next();
};

exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(404).json({
      status: 'Failed',
      message: 'Name and price fields are missing!',
    });
  }
  next();
};

exports.getAllProducts = (req, res) => {
  res.status(200).json({
    status: 'Success',
    requestedAt: req.requestTime,
    data: {
      products,
    },
  });
};

exports.createProduct = (req, res) => {
  const newID = products[products.length - 1].id + 1;
  const newProduct = Object.assign({ id: newID }, req.body);
  products.push(newProduct);
  fs.writeFile(
    './../data/tours-simple.json',
    JSON.stringify(products),
    (err) => {
      res.status(201).json({
        status: 'Success',
        data: {
          product: newProduct,
        },
      });
    }
  );
};
exports.getOneProduct = (req, res) => {
  console.log(req.params);
  const id = req.params.id * 1;

  const product = products.find((product) => product.id === id);
  res.status(200).json({
    status: 'Success',
    data: {
      product,
    },
  });
};

exports.updateOneProduct = (req, res) => {
  res.status(200).json({
    status: 'Success',
    data: {
      product: '<Updated product...>',
    },
  });
};

exports.deleteOneProduct = (req, res) => {
  res.status(204).json({
    status: 'Success',
    data: null,
  });
};
