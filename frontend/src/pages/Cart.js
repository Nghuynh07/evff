import CartContainer from "../layout/CartContainer";
import CartItems from "../components/CartItems";
import Checkout from "../components/Checkout";
import { useEffect, useState } from "react";
import { getCart, itemTotal } from "../cart/cart-helper";
import classes from "./Cart.module.css";
const Cart = () => {
  const [items, setItems] = useState([]);
  const [run, setRun] = useState(false);

  useEffect(() => {
    setItems(getCart() || []);
  }, [run]);

  const total = () => {
    return items.reduce((current, next) => {
      return current + next.count * next.price;
    }, 0);
  };

  return (
    <CartContainer>
      <Checkout
        quantity={itemTotal()}
        products={items}
        run={run}
        setRun={setRun}
        total={total}
      />
      <div className={classes.cartItems}>
        {items &&
          items.map((item) => (
            <CartItems
              key={item._id}
              item={item}
              setRun={setRun}
              run={run}
              total={total}
            />
          ))}
      </div>
    </CartContainer>
  );
};

export default Cart;
