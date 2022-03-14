import React, { useState, useEffect } from 'react';
import Product from '../products/Product';
import axios from 'axios';
import ProductsContainer from '../layout/ProductsContainer';
import Loading from '../components/Loading';
const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, SetError] = useState('');

  useEffect(() => {
    const viewProducts = async () => {
      try {
        const res = await axios.get(`/api/v1/products`);
        const data = await res.data.data;
        setLoading(true);
        SetError('');
        setTimeout(() => {
          setProducts((previous) => {
            return [...previous];
          });
          setLoading(false);
        }, 500);
      } catch (err) {
        setLoading(false);
        SetError('Something went wrong. Please try again...');
      }
    };
    viewProducts();
  }, []);

  const loadScreen = () => {
    return (
      <div className="loading-container ">
        {loading && <Loading text="Please wait..." />}
        {error && <Loading text={error} />}
      </div>
    );
  };

  const shopProducts = () => {
    return (
      <ProductsContainer>
        {products.map((product) => {
          return <Product key={product._id} product={product} />;
        })}
      </ProductsContainer>
    );
  };

  return (
    <>
      {loadScreen()}
      {shopProducts()}
    </>
  );
};

export default Shop;
