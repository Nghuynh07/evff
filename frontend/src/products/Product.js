import React from 'react';
import Card from '../components/Card';
import classes from './Product.module.css';
import ShowImage from '../components/ShowImage';
import { addItem } from '../cart/cart-helper';
import Button from '../components/Button';

const Product = ({ product }) => {
  const { photo, name, price, packaging } = product;

  const addItemToCart = () => {
    addItem(product);
  };

  return (
    <Card>
      <ShowImage photo={photo} imageStyle={classes.product} />
      <div className={classes.productInfo}>
        <h2 className={classes.productName}>{name}</h2>
        <h4 className={classes.productPrice}>
          ${price}/{packaging}
        </h4>
      </div>
      <Button onClick={addItemToCart} name="ADD TO CART" type="button" />
    </Card>
  );
};

export default Product;
