const ProductsContainer = ({ children }) => {
  return (
    <div className="products-container">
      <div className="products">{children}</div>
    </div>
  );
};

export default ProductsContainer;
