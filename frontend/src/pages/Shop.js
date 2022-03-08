import React, { useContext, useState, useEffect } from 'react';
import Product from '../products/Product';
import axios from 'axios';
import ProductsContainer from '../layout/ProductsContainer';
import { ProductContext } from '../store/product-context';

const Shop = () => {
  const pContext = useContext(ProductContext);
  const { getProducts } = pContext;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const data = async () => {
      await axios.get('/api/v1/products').then((res) => {
        setLoading(false);
        setProducts(res.data.data);
      });
    };
    data();
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
