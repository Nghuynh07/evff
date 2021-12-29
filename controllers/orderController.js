const { Order, CartItem } = require('./../models/orderModel');
const catchAsync = require('../utils/catchAsync');

exports.orderCreate = catchAsync(async (req, res) => {
  //   console.log('create order', req.body);
  try {
    const order = await Order.create(req.body.order);
    res.status(200).json({
      status: 'Success',
      order,
    });
  } catch (err) {
    console.log(err);
  }
});

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (err) {
    console.log(err);
  }
};
