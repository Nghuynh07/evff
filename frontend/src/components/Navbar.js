import React, { useContext } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { AuthContext } from '../store/auth-context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHouseChimney,
  faShop,
  faCartShopping,
  faUser,
  faUnlock,
  faLock,
} from '@fortawesome/free-solid-svg-icons';
import { CartContext } from '../store/cart-context';
import Loading from './Loading';
const Navbar = () => {
  const cartContext = useContext(CartContext);
  const { itemTotal } = cartContext;

  const aCtx = useContext(AuthContext);
  const { loading, isLoggedIn, isAuthenticated, logout } = aCtx;

  const loadScreen = () => {
    return (
      <div className="loading-container ">
        {loading && <Loading text="You are logging out. Please wait..." />}
      </div>
    );
  };

  return (
    <nav className="navbar">
      <div className="navbar-links-container">
        <Link className="navbar-link" to="/home">
          <FontAwesomeIcon icon={faHouseChimney} />
        </Link>

        <Link className="navbar-link" to="/shop">
          <FontAwesomeIcon icon={faShop} />
        </Link>

        {!isLoggedIn && (
          <Link className="navbar-link" to="/login">
            <FontAwesomeIcon icon={faUnlock} />
          </Link>
        )}
        {isLoggedIn &&
        isAuthenticated() &&
        isAuthenticated().data.data.user.role === 'user' ? (
          <Link className="navbar-link" to="/users-dashboard">
            <FontAwesomeIcon icon={faUser} />
          </Link>
        ) : null}
        {isLoggedIn &&
        isAuthenticated() &&
        isAuthenticated().data.data.user.role === 'wholesale' ? (
          <Link className="navbar-link" to="/wholesale-dashboard">
            <FontAwesomeIcon icon={faUser} />
          </Link>
        ) : null}
        {isLoggedIn &&
        isAuthenticated() &&
        isAuthenticated().data.data.user.role === 'admin' ? (
          <Link className="navbar-link" to="/admin-dashboard">
            <FontAwesomeIcon icon={faUser} />
          </Link>
        ) : null}
        {isLoggedIn && (
          <span onClick={logout} className="navbar-link navbar-logout">
            <FontAwesomeIcon icon={faLock} />
          </span>
        )}
        <div className="navbar-cart">
          <Link className="navbar-link" to="/cart">
            <FontAwesomeIcon icon={faCartShopping} />
          </Link>
          <span className="navbar-cart-size">{itemTotal()}</span>
        </div>
      </div>
    </nav>
  );
};

export default withRouter(Navbar);
