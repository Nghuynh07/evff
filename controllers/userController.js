const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const globalHandlers = require('./globalHandlers');

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.updateMe = catchAsync(async (req, res, next) => {
  //1)Create error if user POSTs password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'This route is not for password updates. Please use another route',
        400
      )
    );
  }
  //2) Update user document
  const filteredBody = filterObj(req.body, 'firstName', 'lastName', 'email');
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

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
