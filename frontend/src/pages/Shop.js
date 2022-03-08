import React, { useContext } from 'react';
import ProductsContainer from '../layout/ProductsContainer';
import { ProductContext } from '../store/product-context';
import { Card } from '../products/Product';
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
      photo: 'product-Asian Pears-1646627850044.jpeg',
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
      photo: 'product-Asian Pears-1646627850044.jpeg',
    },
  ];
  let url = `/public`;
  return (
    <ProductsContainer>
      {p.map((product) => (
        <Card key={product._id}>
          <img src={`${url}/${product.photo}`} alt={product.name} />
          <div className="product-info">
            <h2 className="product-name">{product.name}</h2>
            <h4 className="product-price">${product.price}</h4>
          </div>
          <button className="product-button">add to cart</button>
        </Card>
      ))}
    </ProductsContainer>
  );
};

export default Shop;
