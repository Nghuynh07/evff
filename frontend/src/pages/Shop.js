import React, { useContext } from 'react';
import Product from '../products/Product';
import ProductsContainer from '../layout/ProductsContainer';
import { ProductContext } from '../store/product-context';

const Shop = () => {
  const pContext = useContext(ProductContext);
  const products = pContext.products;

  return (
    <ProductsContainer>
      {products.map((product) => (
        <Product key={product._id} product={product} />
      ))}
    </ProductsContainer>
  );
};

export default Shop;
