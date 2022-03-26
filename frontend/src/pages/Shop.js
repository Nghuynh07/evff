import React, { useEffect, useContext } from 'react';
import Product from '../products/Product';
import ProductsContainer from '../layout/ProductsContainer';
import Loading from '../components/Loading';
import { ProductContext } from '../store/product-context';
import { useViewHook } from '../hooks/view-hooks';
const Shop = () => {
  const { getProducts } = useContext(ProductContext);
  const { items, loading, error, view } = useViewHook(getProducts);

  useEffect(() => {
    view();
  }, []);

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
        {items.map((product) => {
          return <Product key={product._id} product={product} />;
        })}
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
