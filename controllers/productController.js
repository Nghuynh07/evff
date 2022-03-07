const globalHandlers = require('./globalHandlers');
const Product = require('./../models/productModel');
const multer = require('multer');
const sharp = require('sharp');
const catchAsync = require('./../utils/catchAsync');
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

exports.resizeProductPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  req.body.photo = `product-${req.body.name}-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(2000, 1333)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/${req.body.photo}`);

  next();
});

exports.getAllProducts = globalHandlers.getAll(Product);
exports.createProduct = globalHandlers.createOne(Product);
exports.getOneProduct = globalHandlers.getOne(Product);
exports.updateOneProduct = globalHandlers.updateOne(Product);
exports.deleteOneProduct = globalHandlers.deleteOne(Product);
