const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const orderController = require('../controllers/orderController');
const userController = require('../controllers/userController');

//USER ROUTER FOR ORDERS

router.use(authController.protect);
router
  .route('/')
  .post(userController.addOrderToUserHistory, orderController.orderCreate);

///ADMIN ROUTES FOR ORDERS
router.use(authController.protect, authController.restrictTo('admin'));

router.route('/').get(orderController.getAllOrders);

router
  .route('/:orderId/status-update')
  .patch(orderController.updateOrderStatus);

router.get(
  '/status-values',
  orderController.orderById,
  orderController.getStatusValues
);

// router.param('orderId', orderController.orderById);

module.exports = router;
