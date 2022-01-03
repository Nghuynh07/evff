const { Order, CartItem } = require('./../models/orderModel');

exports.orderCreate = async (req, res) => {
  try {
    req.body.order.user = req.user;
    const order = await new Order(req.body.order);

    order.save((err, data) => {
      if (err) {
        return res.status(400).json({
          err: err,
        });
      } else {
        res.json(data);
      }
    });
  } catch (err) {
    console.log(err);
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate(
      'user',
      'firstName lastName email _id'
    );
    // console.log(orders);
    res.status(200).json(orders);
  } catch (err) {
    console.log(err);
  }
};

exports.getStatusValues = async (req, res) => {
  try {
    await res.json(Order.schema.path('status').enumValues);
  } catch (err) {
    console.log(err);
  }
};

exports.orderById = (req, res, next, id) => {
  Order.findById(id)
    .populate('products.product', 'name price')
    .exec((err, order) => {
      if (err || !order) {
        return res.status(400).json({
          err: err,
        });
      }
      res.order = order;
      next();
    });
};

exports.updateOrderStatus = (req, res) => {
  console.log('REQ.BODY', req.body);
  Order.updateOne(
    { _id: req.body.orderId },
    { $set: { status: req.body.status } },
    (err, order) => {
      if (err) {
        return res.status(400).json({
          err: err,
        });
      }
      res.json(order);
    }
  );
};

exports.getUserOrderHistory = async (req, res) => {
  await Order.find({ user: req.user._id })
    .populate('user', '_id firstName lastName')
    .sort('-created')
    .exec((err, orders) => {
      if (err) {
        res.status(400).json({ err: err });
      }
      res.json({
        status: 'success',
        length: orders.length,
        orders,
      });
    });
};
