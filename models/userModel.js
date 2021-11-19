const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
    maxlength: [40, 'Field must be less than or equal to 40 characters'],
    minlength: [3, 'Field must have more than or equal to 3 characters'],
  },
  lastName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
    maxlength: [40, 'Field must be less than or equal to 40 characters'],
    minlength: [3, 'Field must have more than or equal to 3 characters'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide valid email'],
  },
  photo: String,
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Minimum 8 character is required'],
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm password'],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: 'Passwords do not match',
    },
  },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
