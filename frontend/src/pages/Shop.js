import React, { useState, useEffect } from 'react';
import Product from '../products/Product';
import axios from 'axios';
import ProductsContainer from '../layout/ProductsContainer';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const viewProducts = async () => {
      setLoading(true);
      try {
        const res = await axios.get('/api/v1/products');
        const data = await res.data.data;
        setProducts(data || []);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    viewProducts();
  }, []);

  return (
    <ProductsContainer>
      {loading && <p>Loading....</p>}
      {products.map((product) => (
        <Product key={product._id} product={product} />
      ))}
    </ProductsContainer>
  );
};

export default Shop;
