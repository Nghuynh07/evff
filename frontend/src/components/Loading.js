import React from "react";
import classes from "./Loading.module.css";
const Loading = ({ loading, error }) => {
  return (
    <div className={classes.loading}>{loading && !error && <span></span>}</div>
  );
};

export default Loading;
