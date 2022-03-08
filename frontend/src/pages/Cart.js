import { useEffect, useState, useContext } from 'react';
import CartContainer from '../layout/CartContainer';
import CartItems from '../components/CartItems';
import Checkout from '../components/Checkout';
import { CartContext } from '../store/cart-context';
const Cart = () => {
  const cCxt = useContext(CartContext);

  const [items, setItems] = useState([]);
  const [run, setRun] = useState(false);

  const itemLength = cCxt.itemTotal();

  useEffect(() => {
    setItems(cCxt.getCart());
  }, [run]);

  const total = () => {
    return items.reduce((current, next) => {
      return current + next.count * next.price;
    }, 0);
  };

  return (
    <CartContainer>
      <Checkout
        quantity={itemLength}
        products={items}
        run={run}
        setRun={setRun}
        total={total}
      />
      <div className="cart">
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
