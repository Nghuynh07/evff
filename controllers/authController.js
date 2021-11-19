const User = require('./../models/userModel');
const jwt = require('jsonwebtoken');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};
exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  const token = signToken(newUser._id);

  res.status(201).json({
    status: 'Success',
    token,
    data: {
      user: newUser,
    },
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  //1 check if email/password exist
  if (!email || !password) {
    return next(new AppError('Please provide correct credentials'), 400);
  }
  //2 check if user and password is correct
  const user = await User.findOne({ email }).select('+password');

  //3 if everything is ok send token to client
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(
      new AppError('Incorrect credentials. Please try again or signup', 401)
    );
  }
  const token = signToken(user._id);
  res.status(200).json({
    status: 'Login successful',
    token,
  });
});
