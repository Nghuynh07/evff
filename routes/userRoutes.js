const express = require('express');
const router = express.Router();
const userController = require('./../controllers/userController');
const User = require('./../models/userModel');
const authController = require('./../controllers/authController');

router.post('/signup', authController.signup);
router.post('/login', authController.login);

router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createOneUser);
router
  .route('/:id')
  .get(userController.getOneUser)
  .patch(userController.updateOneUser)
  .delete(userController.deleteOneUser);

module.exports = router;
