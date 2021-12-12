const globalHandlers = require('./globalHandlers');
const Product = require('./../models/productModel');
const multer = require('multer');

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/img/users');
  },
  filename: (req, file, cb) => {
    // user-29083490-2343.jpeg
    const ext = file.mimetype.split('/')[1];
    cb(null, `user-${req.user.id}-${Date.now()}.${ext}`);
  },
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not An image! Please upload only images', 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.productPhotoUpload = upload.single('photo');

exports.getAllProducts = globalHandlers.getAll(Product);
exports.createProduct = globalHandlers.createOne(Product);
exports.getOneProduct = globalHandlers.getOne(Product);
exports.updateOneProduct = globalHandlers.updateOne(Product);
exports.deleteOneProduct = globalHandlers.deleteOne(Product);
