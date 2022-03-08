import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../store/auth-context';
import { listOrders } from './apiAdmin';
const Orders = () => {
  const auth = useContext(AuthContext);
  const [orders, setOrders] = useState([]);

  const loadOrders = () => {
    listOrders(auth.isAuthenticated().data.token).then((data) => {
      let orderList = [];
      let list = data.data;

      list.forEach((item) => {
        orderList.push(item);
      });

      setOrders(orderList || []);
    });
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const showOrdersLength = () => {
    if (orders.length > 0) {
      return (
        <h1 style={{ margin: 'auto' }} className="text-danger display-2">
          Total Orders: {orders.length}
        </h1>
      );
    } else {
      return <h1>No Order</h1>;
    }
  };
  return (
    <>
      {showOrdersLength()}
      {orders.map((order) => (
        <div key={order._id} className="orders">
          <div className="orders-info">
            <h1 className="orders-id">Order ID: {order._id}</h1>
            <p className="orders-name">
              Customer:{order.user.firstName} {order.user.lastName}
            </p>
            <p className="orders-address">Address: {order.address}</p>
            <h2 className="orders-length">
              Total Product(s) in the order: {order.products.length}
            </h2>
          </div>
          {order.products.map((product) => (
            <div className="orders-product-info" key={product._id}>
              <h3 className="orders-product-info-text">
                Product: {product.name}
              </h3>
              <h4 className="orders-product-info-text">
                Price: {product.price}/count
              </h4>
              <h4 className="orders-product-info-text">
                Count: {product.count}
              </h4>
              <h4 className="orders-product-info-text">
                Total ${product.count * product.price}
              </h4>
            </div>
          ))}
          <h1 className="orders-total">Total: {order.amount.toFixed(2)}</h1>
        </div>
      ))}
    </>
  );
};

export default Orders;
