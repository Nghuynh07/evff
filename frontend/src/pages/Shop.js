import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Product from '../products/Product';
import ProductsContainer from '../layout/ProductsContainer';
import { itemTotal } from '../cart/cart-helper';
const Shop = () => {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    try {
      const res = await axios.get(`/api/v1/products`);
      let shoppingList = [];

      let shopItems = res.data.data;

      shopItems.forEach((item) => {
        shoppingList.push(item);
      });

      setProducts(shoppingList || []);
    } catch (err) {
      console.log(err.response);
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
