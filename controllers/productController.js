const globalHandlers = require('./globalHandlers');
const Product = require('./../models/productModel');
const multer = require('multer');
const sharp = require('sharp');

// const multerStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'public/products');
//   },
//   filename: (req, file, cb) => {
//     // user-29083490-2343.jpeg
//     const ext = file.mimetype.split('/')[1];
//     cb(null, `user-${req.user.id}-${Date.now()}.${ext}`);
//   },
// });

const multerStorage = multer.memoryStorage();

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

exports.resizeProductPhoto = (req, res, next) => {
  if (!req.file) return next();

  console.log(req.file);
  req.file.filename = `product-${req.body.name}-${Date.now()}.jpeg`;
  sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/img/products/${req.file.filename}`);
  next();
};

exports.getAllProducts = globalHandlers.getAll(Product);
exports.createProduct = globalHandlers.createOne(Product);
exports.getOneProduct = globalHandlers.getOne(Product);
exports.updateOneProduct = globalHandlers.updateOne(Product);
exports.deleteOneProduct = globalHandlers.deleteOne(Product);
