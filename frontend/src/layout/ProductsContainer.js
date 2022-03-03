import classes from "./ProductsContainer.module.css";

const ProductsContainer = ({ children }) => {
  return <div className={classes.productsContainer}>{children}</div>;
};

export default ProductsContainer;
