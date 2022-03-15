import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../store/auth-context';
import Loading from '../components/Loading';
import { ProductContext } from '../store/product-context';

const Orders = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const { getOrders } = useContext(ProductContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const token = isAuthenticated().data.token;

  const loadOrders = (token) => {
    setLoading(true);
    setTimeout(() => {
      getOrders(token)
        .then((res) => {
          setOrders(res.data);
          setLoading(false);
          setError('');
        })
        .catch((err) => {
          setLoading(true);
          setError('Something went wrong. Please try again...');
        });
    }, 500);
  };
  useEffect(() => {
    loadOrders(token);
  }, []);

  const showOrdersLength = () => {
    if (orders.length > 0) {
      return <h1 style={{ margin: 'auto' }}>Total Orders: {orders.length}</h1>;
    } else {
      return <h1>No Order</h1>;
    }
  };

  const loadScreen = () => {
    return (
      <div className="loading-container ">
        {loading && <Loading text="Loading all orders. Please wait..." />}
        {error && <Loading text={error} />}
      </div>
    );
  };

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
  return (
    <>
      {loadScreen()}
      {showOrdersLength()}
      {orders.map((order) => (
        <div key={order._id} className="orders">
          <div className="orders-info">
            <h1>Date Purchase: {getDate()}</h1>
            <h2 className="orders-id">Order ID: {order._id}</h2>
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
