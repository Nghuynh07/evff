const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { generateToken } = require('../controllers/braintreeController');

router.get('/getToken/:userID', authController.protect, generateToken);

module.exports = router;
