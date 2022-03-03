import React from "react";
import classes from "./CartContainer.module.css";
const CartContainer = ({ children }) => {
  return <div className={classes.cartContainer}>{children}</div>;
};

export default CartContainer;
