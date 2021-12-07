const express = require('express');
const router = express.Router();
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/logout', authController.logout);

router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);
router.patch(
  '/updateMyPassword',
  authController.protect,
  authController.updatePassword
);

//USER ROUTES ONCE LOGGED IN
router.patch(
  '/updateMe',
  authController.protect,
  authController.restrictTo('user'),
  userController.updateMe
);
router.delete(
  '/deleteMe',
  authController.protect,
  authController.restrictTo('user'),
  userController.deleteMe
);

//ADMIN ROUTES FOR USERS
router.use(authController.protect, authController.restrictTo('admin'));
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
