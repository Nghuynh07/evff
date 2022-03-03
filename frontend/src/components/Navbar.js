import React, { useContext, useEffect } from "react";
import classes from "./Navbar.module.css";
import { Link, withRouter } from "react-router-dom";
import { AuthContext } from "../store/auth-context";
import { itemTotal } from "../cart/cart-helper";
const Navbar = () => {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    itemTotal();
  }, []);

  return (
    <header className={classes.header}>
      <ul>
        <li>
          <Link className={`${classes.link}`} to='/home'>
            home
          </Link>
        </li>
        <li>
          <Link className={classes.link} to='/shop'>
            shop
          </Link>
        </li>

        {!authContext.isLoggedIn && (
          <li>
            <Link className={classes.link} to='/login'>
              login
            </Link>
          </li>
        )}
        {authContext.isLoggedIn &&
        authContext.isAuthenticated() &&
        authContext.isAuthenticated().data.data.user.role === "user" ? (
          <li>
            <Link className={classes.link} to='/users-dashboard'>
              Dashboard
            </Link>
          </li>
        ) : null}
        {authContext.isLoggedIn &&
        authContext.isAuthenticated() &&
        authContext.isAuthenticated().data.data.user.role === "wholesale" ? (
          <li>
            <Link className={classes.link} to='/wholesale-dashboard'>
              Dashboard
            </Link>
          </li>
        ) : null}
        {authContext.isLoggedIn &&
        authContext.isAuthenticated() &&
        authContext.isAuthenticated().data.data.user.role === "admin" ? (
          <li>
            <Link className={classes.link} to='/admin-dashboard'>
              Dashboard
            </Link>
          </li>
        ) : null}
        {authContext.isLoggedIn && (
          <li className={classes.link}>
            <span className={classes.span} onClick={authContext.logout}>
              logout
            </span>
          </li>
        )}
        <li className={classes.cartIconContainer}>
          <Link className={classes.link} to='/cart'>
            Cart
          </Link>
          <span>{itemTotal()}</span>
        </li>
      </ul>
    </header>
  );
};

export default withRouter(Navbar);
