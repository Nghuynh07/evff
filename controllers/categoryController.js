const Category = require('./../models/categoryModel');

exports.createCat = (req, res) => {
  const category = new Category(req.body);
  category.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    res.json({
      message: 'success',
      data: {
        category,
      },
    });
  });
};

exports.getAll = async (req, res) => {
  try {
    const categories = await Category.find();
    console.log(categories);
    res.status(200).json({
      message: 'success',
      data: {
        categories,
      },
    });
  } catch (err) {
    console.log(err);
  }
};
