import React, { useState, useEffect } from 'react';
import Product from '../products/Product';
import axios from 'axios';
import ProductsContainer from '../layout/ProductsContainer';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const getProducts = async () => {
    return await axios.get('/api/v1/products');
  };

  const viewProducts = () => {
    setLoading(true);
    getProducts().then((res) => {
      console.log(res.data.dada);
      setProducts(res.data.data || []);
      setLoading(false);
    });
  };

  useEffect(() => {
    viewProducts();
  }, []);

  return (
    <ProductsContainer>
      {loading && (
        <div>
          <h3>loading please wait....</h3>
        </div>
      )}
      {products.map((product) => (
        <Product key={product._id} product={product} />
      ))}
    </ProductsContainer>
  );
};

export default Shop;
