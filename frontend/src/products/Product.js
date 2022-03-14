import { useContext, useState } from 'react';
import ShowImage from '../components/ShowImage';
import { CartContext } from '../store/cart-context';

export const Card = ({ children }) => {
  return <div className="card">{children}</div>;
};

const Product = ({ product }) => {
  const cartContext = useContext(CartContext);
  const { addItem, getCart } = cartContext;

  const { photo, name, price, packaging } = product;

  const addItemToCart = () => {
    addItem(product);
  };

  return (
    <Card>
      <ShowImage photo={photo} imageStyle="product" />
      <div className="product-info">
        <h2 className="product-name">{name}</h2>
        <h4 className="product-price">
          ${price}/{packaging}
        </h4>
      </div>
      <button onClick={addItemToCart} className="product-button">
        add to cart
      </button>
    </Card>
  );
};

export default Product;
