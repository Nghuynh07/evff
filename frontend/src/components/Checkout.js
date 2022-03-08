import { useState, useContext } from 'react';
import { AuthContext } from '../store/auth-context';
import { Link } from 'react-router-dom';
import { createOrder } from '../admin/apiAdmin';

const Checkout = ({
  quantity,
  products,
  total,
  run = undefined,
  setRun = (f) => f,
}) => {
  const auth = useContext(AuthContext);
  const [data, setData] = useState({
    loading: false,
    success: false,
    error: '',
    address: '',
    date: '',
  });

  const handleAddress = (event) => {
    setData({ ...data, address: event.target.value });
  };

  const { loading, success, address } = data;

  const buy = () => {
    setData({ loading: true });
    const orderData = {
      products,
      address,
      amount:
        auth.isAuthenticated().data.data.user.role === 'wholesale'
          ? total() * 0.6
          : total(),
    };
    setTimeout(() => {
      createOrder(auth.isAuthenticated().data.token, orderData)
        .then((res) => {
          localStorage.removeItem('cart');
          setRun(!run);
          setData({ loading: false, success: true });
        })
        .catch((err) => {
          setData({
            loading: false,
            error: 'Something went wrong. Please notify merchant',
          });
        });
    }, 2000);
  };

  let showButton;
  if (address && products.length > 0) {
    showButton = (
      <button className="checkout-button" type="submit" onClick={buy}>
        checkout
      </button>
    );
  } else {
    showButton = (
      <button className="checkout-button" type="submit" onClick={buy} disabled>
        Checkout
      </button>
    );
  }

  const showCheckout = () => {
    return auth.isAuthenticated() ? (
      showButton
    ) : (
      <Link to="/login">
        <button className="checkout-button">Signin to checkout</button>
      </Link>
    );
  };

  return (
    <>
      <div className="checkout">
        <div className="checkout-address">
          <textarea
            className="checkout-textarea"
            rows="5"
            onChange={handleAddress}
            placeholder="For faster service, please tell us where you are ordering from and which department you are in."
          />
        </div>
        <div className="checkout-container">
          {loading ? (
            <h3 className="checkout-is-submitted">
              Your order is being submitted. Please wait...
            </h3>
          ) : (
            <h3>
              You have <span className="checkout-quantity">{quantity}</span>
              item(s) in your cart
            </h3>
          )}
          {auth.isLoggedIn &&
            auth.isAuthenticated() &&
            auth.isAuthenticated().data.data.user.role === 'wholesale' && (
              <h3 className="checkout-discount">Discount: 40%</h3>
            )}
          {
            <h1 className="checkout-total">
              TOTAL: $
              {auth.isLoggedIn &&
              auth.isAuthenticated() &&
              auth.isAuthenticated().data.data.user.role === 'wholesale'
                ? (total() * 0.6).toFixed(2)
                : total().toFixed(2)}
            </h1>
          }
          {success ? (
            <h3 className="checkout-is-submitted">
              Your order has been submitted
            </h3>
          ) : (
            showCheckout()
          )}
        </div>
      </div>
    </>
  );
};

export default Checkout;
