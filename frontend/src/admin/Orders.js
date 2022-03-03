import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../store/auth-context";
import { listOrders } from "./apiAdmin";
import classes from "./Orders.module.css";

const Orders = () => {
  const auth = useContext(AuthContext);
  const [orders, setOrders] = useState([]);

  const loadOrders = () => {
    listOrders(auth.isAuthenticated().data.token).then((data) => {
      setOrders(data.data);
    });
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const showOrdersLength = () => {
    if (orders.length > 0) {
      return (
        <h1 style={{ margin: "auto" }} className='text-danger display-2'>
          Total Orders: {orders.length}
        </h1>
      );
    } else {
      return <h1 className='text-danger'>No Order</h1>;
    }
  };
  return (
    <>
      {showOrdersLength()}
      {orders.map((order) => (
        <div key={order._id} className={classes.orders}>
          <h1>Order ID: {order._id}</h1>
          <ul>
            <li>
              Customer:{order.user.firstName} {order.user.lastName}
            </li>
            <li>Address: {order.address}</li>
          </ul>
          <h3>Total Product(s) in the order: {order.products.length}</h3>
          {order.products.map((product) => (
            <div key={product._id}>
              <div className={classes.orderProductsInfoContainer}>
                <h4>Product: {product.name}</h4>
                <h4>Price: {product.price}/count</h4>
                <h4>Count: {product.count}</h4>
                <h4>Total ${product.count * product.price}</h4>
              </div>
            </div>
          ))}
          <h1 style={{ marginTop: "1rem" }}>
            Total Order Amount: {order.amount.toFixed(2)}
          </h1>
        </div>
      ))}
    </>
  );
};

export default Orders;
