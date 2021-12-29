const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const orderController = require('../controllers/orderController');
const userController = require('../controllers/userController');

router.use(authController.protect);
router
  .route('/')
  .post(userController.addOrderToUserHistory, orderController.orderCreate)
  .get(authController.restrictTo('admin'), orderController.getAllOrders);

module.exports = router;
