const multer = require('multer');
const sharp = require('sharp');
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const globalHandlers = require('./globalHandlers');

// const multerStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'public/img/users');
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

exports.uploadUserPhoto = upload.single('photo');

exports.resizeUserPhoto = (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;

  sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/img/users/${req.file.filename}`);

  next();
};

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.updateMe = catchAsync(async (req, res, next) => {
  // console.log(req.file);
  // console.log(req.body);
  //1)Create error if user POSTs password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'This route is not for password updates. Please use another route',
        400
      )
    );
  }

  if (req.body.transaction) {
    return;
  }

  //2) Update user document
  const filteredBody = filterObj(
    {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
    },
    'firstName',
    'lastName',
    'email'
  );

  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });
  if (req.file) filteredBody.photo = req.file.filename;

  console.log(req.body.photo);

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });
  res.status(204).json({
    status: 'Success',
    data: null,
  });
});

exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

exports.getAllUsers = globalHandlers.getAll(User);
exports.getOneUser = globalHandlers.getOne(User);
exports.updateOneUser = globalHandlers.updateOne(User);
exports.deleteOneUser = globalHandlers.deleteOne(User);

exports.createOneUser = (req, res) => {
  res.status(500).json({
    status: 'Error',
    message: 'Route is not yet defined',
  });
};

exports.addOrderToUserHistory = async (req, res, next) => {
  try {
    let history = [];
    await req.body.order.products.forEach((item) => {
      history.push({
        _id: item._id,
        name: item.name,
        category: item.category,
        quantity: item.count,
        transaction: req.body.order.transaction,
        amount: req.body.order.amount,
      });
    });
    await User.findOneAndUpdate(
      {
        _id: req.user._id,
      },
      { $push: { history: history } },
      { new: true }
    );
    next();
  } catch (err) {
    console.log(err);
  }
};
