import React, { useContext } from 'react';
import Product from '../products/Product';
import ProductsContainer from '../layout/ProductsContainer';
import { ProductContext } from '../store/product-context';
const Shop = () => {
  const pContext = useContext(ProductContext);
  const { products, loading } = pContext;

  const p = [
    {
      _id: 'p1',
      name: 'name1',
      price: 20,
      photo: 'product-Apples-Varieties-1646627812783.jpeg',
    },
    {
      _id: 'p2',
      name: 'name2',
      price: 20,
      photo: 'product-Apples-Varieties-1646627812783.jpeg',
    },
    {
      _id: 'p3',
      name: 'name3',
      price: 20,
      photo: 'product-Apples-Varieties-1646627812783.jpeg',
    },
    {
      _id: 'p4',
      name: 'name4',
      price: 20,
      photo: 'product-Apples-Varieties-1646627812783.jpeg',
    },
  ];

  return (
    <ProductsContainer>
      {p.map((product) => (
        <Product key={product._id} product={product} />
      ))}
    </ProductsContainer>
  );
};

export default Shop;
