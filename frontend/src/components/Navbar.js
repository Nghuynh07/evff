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

const Navbar = () => {
  const authContext = useContext(AuthContext);
  const cartContext = useContext(CartContext);

  return (
    <header className="navbar">
      <div className="navbar-links-container">
        <Link className="navbar-link" to="/home">
          <FontAwesomeIcon icon={faHouseChimney} />
        </Link>

        <Link className="navbar-link" to="/shop">
          <FontAwesomeIcon icon={faShop} />
        </Link>

        {!authContext.isLoggedIn && (
          <Link className="navbar-link" to="/login">
            <FontAwesomeIcon icon={faUnlock} />
          </Link>
        )}
        {authContext.isLoggedIn &&
        authContext.isAuthenticated() &&
        authContext.isAuthenticated().data.data.user.role === 'user' ? (
          <Link className="navbar-link" to="/users-dashboard">
            <FontAwesomeIcon icon={faUser} />
          </Link>
        ) : null}
        {authContext.isLoggedIn &&
        authContext.isAuthenticated() &&
        authContext.isAuthenticated().data.data.user.role === 'wholesale' ? (
          <Link className="navbar-link" to="/wholesale-dashboard">
            <FontAwesomeIcon icon={faUser} />
          </Link>
        ) : null}
        {authContext.isLoggedIn &&
        authContext.isAuthenticated() &&
        authContext.isAuthenticated().data.data.user.role === 'admin' ? (
          <Link className="navbar-link" to="/admin-dashboard">
            <FontAwesomeIcon icon={faUser} />
          </Link>
        ) : null}
        {authContext.isLoggedIn && (
          <span
            onClick={authContext.logout}
            className="navbar-link navbar-logout"
          >
            <FontAwesomeIcon icon={faLock} />
          </span>
        )}
        <div className="navbar-cart">
          <Link className="navbar-link" to="/cart">
            <FontAwesomeIcon icon={faCartShopping} />
          </Link>
          <span className="navbar-cart-size">{cartContext.itemTotal()}</span>
        </div>
      </div>
    </header>
  );
};

export default withRouter(Navbar);
