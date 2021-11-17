const express = require('express');
const router = express.Router();
const productController = require('./../controllers/productController');

// router.param('id', productController.checkID);

router
  .route('/top-5-products')
  .get(productController.aliasTopTours, productController.getAllProducts);
router.route('/products-stats').get(productController.getProductsStats);

router
  .route('/')
  .get(productController.getAllProducts)
  .post(productController.createProduct);
router
  .route('/:id')
  .get(productController.getOneProduct)
  .patch(productController.updateOneProduct)
  .delete(productController.deleteOneProduct);

module.exports = router;
