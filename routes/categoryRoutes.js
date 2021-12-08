const express = require('express');
const categoryController = require('./../controllers/categoryController');
const router = express.Router();
const authController = require('./../controllers/authController');

router
  .route('/')
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    categoryController.createCat
  );

module.exports = router;
