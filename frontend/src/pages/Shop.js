import React, { useContext, useState, useEffect } from 'react';
import Product from '../products/Product';
import ProductsContainer from '../layout/ProductsContainer';
import { ProductContext } from '../store/product-context';

const Shop = () => {
  const pContext = useContext(ProductContext);
  const { loading, getProducts } = pContext;
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts().then((res) => {
      setProducts(res.data);
    });
  }, [getProducts]);

  return (
    <ProductsContainer>
      {products.map((product) => (
        <Product key={product._id} product={product} />
      ))}
    </ProductsContainer>
  );
};

export default Shop;
