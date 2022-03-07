import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Product from '../products/Product';
import ProductsContainer from '../layout/ProductsContainer';
import { itemTotal } from '../cart/cart-helper';
const Shop = () => {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    try {
      const res = await axios.get(`/api/v1/products`, {
        withCredentials: true,
      });
      console.log(res);
      setProducts(res.data.data.doc);
    } catch (err) {
      console.log(err);
    }
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
