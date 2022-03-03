import React from "react";
import classes from "./FormLayout.module.css";
const FormLayout = ({ children }) => {
  return <div className={classes.formLayout}>{children}</div>;
};

export default FormLayout;
