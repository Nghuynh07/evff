import React, { useContext, useState } from 'react';
import Product from '../products/Product';
import ProductsContainer from '../layout/ProductsContainer';
import { ProductContext } from '../store/product-context';
import { useEffect } from 'react';

import axios from 'axios';
const Shop = () => {
  // const pContext = useContext(ProductContext);
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    await axios.get('/api/v1/products').then((res) => {
      setProducts(res.data.data);
    });
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <ProductsContainer>
      {products &&
        products.map((product) => (
          <Product key={product._id} product={product} />
        ))}
    </ProductsContainer>
  );
};

export default Shop;
