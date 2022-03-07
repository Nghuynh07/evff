import React, { useContext, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { AuthContext } from '../store/auth-context';
import { itemTotal } from '../cart/cart-helper';

const Navbar = () => {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    itemTotal();
  }, []);

  return (
    <header className="navbar">
      <div className="navbar-links-container">
        <Link className="navbar-link" to="/home">
          Home
        </Link>

        <Link className="navbar-link" to="/shop">
          shop
        </Link>

        {!authContext.isLoggedIn && (
          <Link className="navbar-link" to="/login">
            login
          </Link>
        )}
        {authContext.isLoggedIn &&
        authContext.isAuthenticated() &&
        authContext.isAuthenticated().data.data.user.role === 'user' ? (
          <Link className="navbar-link" to="/users-dashboard">
            <i class="fa-solid fa-user"></i>
          </Link>
        ) : null}
        {authContext.isLoggedIn &&
        authContext.isAuthenticated() &&
        authContext.isAuthenticated().data.data.user.role === 'wholesale' ? (
          <Link className="navbar-link" to="/wholesale-dashboard">
            Dashboard
          </Link>
        ) : null}
        {authContext.isLoggedIn &&
        authContext.isAuthenticated() &&
        authContext.isAuthenticated().data.data.user.role === 'admin' ? (
          <Link className="navbar-link" to="/admin-dashboard">
            Dashboard
          </Link>
        ) : null}
        {authContext.isLoggedIn && (
          <li className="navbar-link">
            <span onClick={authContext.logout} className="navbar-logout">
              logout
            </span>
          </li>
        )}
        <div className="navbar-cart">
          <Link className="navbar-link" to="/cart">
            cart
          </Link>
          <span className="navbar-cart-size">{itemTotal()}</span>
        </div>
      </div>
    </header>
  );
};

export default withRouter(Navbar);
