import React, { useContext, useState } from 'react';
import Product from '../products/Product';
import ProductsContainer from '../layout/ProductsContainer';
import { ProductContext } from '../store/product-context';
const Shop = () => {
  const pContext = useContext(ProductContext);

  return (
    <ProductsContainer>
      {pContext.products.map((product) => (
        <Product key={product._id} product={product} />
      ))}
    </ProductsContainer>
  );
};

export default Shop;
