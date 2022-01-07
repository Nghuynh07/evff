const globalHandlers = require('./globalHandlers');
const Product = require('./../models/productModel');
const multer = require('multer');
const sharp = require('sharp');
const catchAsync = require('./../utils/catchAsync');
const formidable = require('formidable');
const _ = require('lodash');
const multerStorage = multer.memoryStorage();
const fs = require('fs');

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
// exports.productPhotoUpload = upload.single('photo');

exports.productPhotoUpload = upload.single('photo');

//upload.fields()
//upload.array()

exports.resizeProductPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  // console.log(req);
  req.body.photo = `product-${req.body.name}-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(2000, 1333)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/${req.body.photo}`);

  next();
});

// exports.photo = (req, res) => {
//   console.log(req);
// };

// exports.createProduct = (req, res) => {
//   let form = new formidable.IncomingForm();
//   form.keepExtensions = true;
//   form.parse(req, (err, fields, files) => {
//     if (err) {
//       return res.status(400).json({
//         error: 'Image could not be uploaded',
//       });
//     }
//     let product = new Product(fields);

//     if (files.photo) {
//       // product.photo.data = fs.readFileSync(files.photo.path);
//       product.photo.contentType = files.photo.type;
//     }

//     product.save((err, result) => {
//       if (err) {
//         return res.status(400).json({
//           error: err,
//         });
//       }
//       res.json(result);
//     });
//   });
// };

exports.getAllProducts = globalHandlers.getAll(Product);
exports.createProduct = globalHandlers.createOne(Product);
exports.getOneProduct = globalHandlers.getOne(Product);
exports.updateOneProduct = globalHandlers.updateOne(Product);
exports.deleteOneProduct = globalHandlers.deleteOne(Product);
