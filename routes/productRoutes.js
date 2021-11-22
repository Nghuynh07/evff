const express = require('express');
const router = express.Router();
const productController = require('./../controllers/productController');
const authController = require('./../controllers/authController');
// router.param('id', productController.checkID);

router
  .route('/top-5-products')
  .get(productController.aliasTopTours, productController.getAllProducts);
router.route('/products-stats').get(productController.getProductsStats);

router
  .route('/')
  .get(authController.protect, productController.getAllProducts)
  .post(productController.createProduct);
router
  .route('/:id')
  .get(productController.getOneProduct)
  .patch(productController.updateOneProduct)
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    productController.deleteOneProduct
  );

module.exports = router;
