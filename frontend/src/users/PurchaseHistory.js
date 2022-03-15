import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../store/auth-context';
import { ProductContext } from '../store/product-context';

const PurchaseHistory = () => {
  const [orderHistory, setOrderHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { isAuthenticated } = useContext(AuthContext);
  const token = isAuthenticated().data.token;
  const { getOrderHistory } = useContext(ProductContext);

  const getPurchasedOrders = (token) => {
    setLoading(true);
    setTimeout(() => {
      getOrderHistory(token)
        .then((res) => {
          setOrderHistory(res.data.orders);
        })
        .catch((err) => {
          setLoading(true);
          setError('Something went wrong. Please try again...');
        });
    }, 500);
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

  const loadingOrderHistory = () => {
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
  return <div>{loadingOrderHistory()}</div>;
};

export default PurchaseHistory;
