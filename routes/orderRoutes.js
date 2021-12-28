const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const orderController = require('../controllers/orderController');
const userController = require('../controllers/userController');

router.post(
  '/order-create',
  authController.protect,
  userController.addOrderToUserHistory,
  orderController.orderCreate
);

module.exports = router;
