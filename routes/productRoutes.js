const express = require('express');
const router = express.Router();
const productController = require('./../controllers/productController');
const authController = require('./../controllers/authController');
// router.param('id', productController.checkID);

// router
//   .route('/getProductCategories')
//   .get(
//     authController.protect,
//     authController.restrictTo('admin'),
//     productController.getProductCategory
//   );
router
  .route('/')
  .get(productController.getAllProducts)
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    productController.productPhotoUpload,
    productController.resizeProductPhoto,
    productController.createProduct
  );
// router.route('/product/photo/:productId').get(productController.photo);

router
  .route('/:id')
  .get(productController.getOneProduct)
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    productController.updateOneProduct
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    productController.deleteOneProduct
  );

module.exports = router;
