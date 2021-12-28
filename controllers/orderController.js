const { Order, CartItem } = require('./../models/orderModel');

exports.orderCreate = async (req, res) => {
  //   console.log('create order', req.body);
  try {
    const order = await new Order(req.body.order);
    order.save((error, data) => {
      // console.log(data);
      if (error) {
        return res.status(400).json({
          error: error,
        });
      }
      res.json(data);
    });
  } catch (err) {
    console.log(err);
  }
};
