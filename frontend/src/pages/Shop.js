import React, { useState, useEffect } from 'react';
import Product from '../products/Product';
import axios from 'axios';
import ProductsContainer from '../layout/ProductsContainer';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const getProducts = async () => {
    return await axios.get('http://localhost:4000/api/v1/products');
  };

  const viewProducts = () => {
    setLoading(true);
    getProducts().then((res) => {
      setProducts(res.data.data);
      setLoading(false);
    });
  };

  useEffect(() => {
    console.log(products);
    viewProducts();
  }, []);

  return (
    <ProductsContainer>
      {loading && (
        <div>
          <h3>loading please wait....</h3>
        </div>
      )}
      {products &&
        products.map((product) => (
          <Product key={product._id} product={product} />
        ))}
    </ProductsContainer>
  );
};

export default Shop;
