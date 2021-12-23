const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const braintreeController = require('../controllers/braintreeController');

router.get(
  '/getToken',
  authController.protect,
  braintreeController.generateToken
);
router.post(
  '/payment',
  authController.protect,
  braintreeController.processPayment
);

module.exports = router;
