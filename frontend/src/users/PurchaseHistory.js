import { useContext, useState, useEffect } from 'react';
import { getUserOrderHistory } from './api-user';
import { AuthContext } from '../store/auth-context';

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
      month: 'long',
      weekday: 'long',
      year: 'numeric',
      day: 'numeric',
    };
    return date.toLocaleString('en-US', options);
  };

  const getOrderHistory = () => {
    return (
      <>
        <div className="purchase">
          <div className="orders-info">
            {orderHistory.map((order) => (
              <div key={order._id} className="purchase-container">
                <h1 className="orders-purchase-date">
                  Purchase date: {getDate()}
                </h1>
                <h1 className="purchase-total">Total</h1>
                <h2 className="orders-length">
                  Total Product(s) in the order: {order.products.length}
                </h2>
                {order.products.map((product) => (
                  <div
                    className="orders-product-info purchase"
                    key={product._id}
                  >
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
              </div>
            ))}
          </div>
        </div>
      </>
    );
  };
  return <div>{getOrderHistory()}</div>;
};

export default PurchaseHistory;
