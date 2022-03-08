import React, { useContext, useState, useEffect } from 'react';
import Product from '../products/Product';
import ProductsContainer from '../layout/ProductsContainer';
import { ProductContext } from '../store/product-context';

const Shop = () => {
  const pContext = useContext(ProductContext);
  const { loading, products } = pContext;
  // console.log(products);

  return (
    <ProductsContainer>
      {loading &&
        products.length > 0 &&
        products.map((product) => (
          <Product key={product._id} product={product} />
        ))}
    </ProductsContainer>
  );
};

export default Shop;
