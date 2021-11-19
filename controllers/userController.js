const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    status: 'Success',
    users,
  });
});
exports.createOneUser = (req, res) => {
  res.status(500).json({
    status: 'Error',
    message: 'Route is not yet defined',
  });
};
exports.getOneUser = (req, res) => {
  res.status(500).json({
    status: 'Error',
    message: 'Route is not yet defined',
  });
};
exports.updateOneUser = (req, res) => {
  res.status(500).json({
    status: 'Error',
    message: 'Route is not yet defined',
  });
};
exports.deleteOneUser = (req, res) => {
  res.status(500).json({
    status: 'Error',
    message: 'Route is not yet defined',
  });
};
