import React, { useContext } from 'react';
import Product from '../products/Product';
import ProductsContainer from '../layout/ProductsContainer';
import { ProductContext } from '../store/product-context';

const Shop = () => {
  const pContext = useContext(ProductContext);
  const { loading, products } = pContext;

  return (
    <ProductsContainer>
      {loading &&
        products !== 0 &&
        products.map((product) => (
          <Product key={product._id} product={product} />
        ))}
    </ProductsContainer>
  );
};

export default Shop;
