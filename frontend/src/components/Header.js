import React from "react";
import classes from "./Header.module.css";

const Header = () => {
  return (
    <header className={classes.header}>
      <h1 className={classes["header-title"]}>echo valley family farm</h1>
      <p className={classes["header-paragraph"]}>local owned business</p>
    </header>
  );
};

export default Header;
