import { useContext, useState, useEffect } from "react";
import { getUserOrderHistory } from "./api-user";
import { AuthContext } from "../store/auth-context";
import classes from "./PurchaseHistory.module.css";
const PurchaseHistory = () => {
  const [orderHistory, setOrderHistory] = useState([]);
  const auth = useContext(AuthContext);
  const token = auth.isAuthenticated().data.token;

  const getPurchasedOrders = (token) => {
    getUserOrderHistory(token)
      .then((data) => {
        setOrderHistory(data.data.orders);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  useEffect(() => {
    getPurchasedOrders(token);
  }, [token]);

  const getDate = () => {
    let date = new Date();
    let options = {
      month: "long",
      weekday: "long",
      year: "numeric",
      day: "numeric",
    };
    return date.toLocaleString("en-US", options);
  };

  const getOrderHistory = () => {
    return (
      <>
        <h3>Purchase History</h3>
        <div className={classes.purchaseHistory}>
          <ul className={classes.purchaseHistoryList}>
            <li className={classes.purchaseHistoryItems}>
              {orderHistory.map((order) => (
                <div key={order._id} className={classes.purchaseContainer}>
                  <h1>Purchase date: {getDate()}</h1>
                  <h3>
                    Total Product(s) in the order: {order.products.length}
                  </h3>
                  {order.products.map((product) => (
                    <div
                      key={product._id}
                      className={classes.purchaseHistoryInfo}
                    >
                      <h4>Product: {product.name}</h4>
                      <h4>Price: {product.price}/count</h4>
                      <h4>Count: {product.count}</h4>
                      <h4>Total: ${product.count * product.price}</h4>
                    </div>
                  ))}
                </div>
              ))}
            </li>
          </ul>
        </div>
      </>
    );
  };
  return <div>{getOrderHistory()}</div>;
};

export default PurchaseHistory;
