import React, { useState, useEffect } from 'react';
import Product from '../products/Product';
import axios from 'axios';
import ProductsContainer from '../layout/ProductsContainer';
import Loading from '../components/Loading';
const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, SetError] = useState('');

  const viewProducts = async () => {
    return await axios.get(`/api/v1/products`).catch((err) => {
      setLoading(false);
      err && SetError('Something went wrong. Please try again...');
    });
  };

  useEffect(() => {
    viewProducts().then((res) => {
      console.log(res.data.data);
      setProducts(res.data.data);
    });
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
