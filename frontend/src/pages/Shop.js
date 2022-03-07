import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Product from '../products/Product';
import ProductsContainer from '../layout/ProductsContainer';
import { itemTotal } from '../cart/cart-helper';
const Shop = () => {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    const res = await axios.get(`http://localhost:4000/api/v1/products`);
    setProducts(res.data.data.doc);
  };
  useEffect(() => {
    getProducts();
    itemTotal();
  }, []);
  return (
    <ProductsContainer>
      {products.map((product) => (
        <Product key={product._id} product={product} />
      ))}
    </ProductsContainer>
  );
};

export default Shop;
