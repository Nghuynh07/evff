import React, { useEffect, useContext } from 'react';
// import Product, { Card } from '../products/Product';
import ProductsContainer from '../layout/ProductsContainer';
import Loading from '../components/Loading';
import { ProductContext } from '../store/product-context';
import { useViewHook } from '../hooks/view-hooks';
import { CartContext } from '../store/cart-context';
const Shop = () => {
  const { addItem } = CartContext;
  const { getProducts } = useContext(ProductContext);
  const { items, loading, error, view } = useViewHook(getProducts);

  useEffect(() => {
    view();
  }, []);

  let url = `http://localhost:4000/public`;

  const loadScreen = () => {
    return (
      <div className="loading-container ">
        {loading && <Loading text="Please wait..." />}
        {error && <Loading text={error} />}
      </div>
    );
  };

  const shopProducts = () => {
    return (
      <ProductsContainer>
        {items.map((product) => (
          <div className="card" key={product._id}>
            <div className="img-wrapper">
              <img src={`${url}/${product.photo}`} alt={product.photo} />
            </div>
            <div className="product-info">
              <h6 className="product-name">{product.name}</h6>
              <h6 className="product-price">
                ${product.price}/{product.packaging}
              </h6>
            </div>
            <button onClick={addItem} className="product-button">
              add to cart
            </button>
          </div>
        ))}
      </ProductsContainer>
    );
  };

  return (
    <>
      {loadScreen()}
      {shopProducts()}
    </>
  );
};

export default Shop;
