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
  faMessage,
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
    <nav className="navbar flex-center">
      <Link to="/home" className="logo flex-center">
        echo<span>valley</span>
      </Link>
      <div className="navbar-infos">
        <Link className="link" to="/home" title="Home">
          home
        </Link>
        <Link className="link" to="/u-pick" title="Home">
          U-Pick
        </Link>
        <Link className="link" to="/shop" title="Home">
          Shop
        </Link>
        <Link className="link" to="/livestock" title="Home">
          Livestock
        </Link>
        <Link className="link" to="/aquaponics" title="Home">
          Aquaponics
        </Link>
        <Link className="link" to="/news" title="Home">
          News
        </Link>
        <Link className="link" to="/contact" title="Home">
          Contact
        </Link>
        <Link className="link" to="/cart" title="Cart">
          Cart
          {/* <span className="navbar-cart-size">{itemTotal()}</span> */}
        </Link>
      </div>

      <div className="navbar-auth-navigation">
        {!isLoggedIn && (
          <Link className="login-btn" to="/login" title="Login">
            login
          </Link>
        )}
        {isLoggedIn &&
        isAuthenticated() &&
        isAuthenticated().data.data.user.role === 'user' ? (
          <Link className="link" to="/users-dashboard" title="Dashboard">
            <FontAwesomeIcon icon={faUser} />
          </Link>
        ) : null}
        {isLoggedIn &&
        isAuthenticated() &&
        isAuthenticated().data.data.user.role === 'wholesale' ? (
          <Link className="link" to="/wholesale-dashboard" title="Dashboard">
            <FontAwesomeIcon icon={faUser} />
          </Link>
        ) : null}
        {isLoggedIn &&
        isAuthenticated() &&
        isAuthenticated().data.data.user.role === 'admin' ? (
          <Link className="link" to="/admin-dashboard" title="Dashboard">
            <FontAwesomeIcon icon={faUser} />
          </Link>
        ) : null}
        {isLoggedIn && (
          <span onClick={logout} className="logout-btn" title="Logout">
            logout
          </span>
        )}
      </div>
    </nav>
  );
};

export default withRouter(Navbar);
