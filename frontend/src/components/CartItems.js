import { useContext } from 'react';
import ShowImage from './ShowImage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { CartContext } from '../store/cart-context';
const CartItems = ({ item, setRun = (f) => f, run }) => {
  const cartContext = useContext(CartContext);

  return (
    <div className="cart-items">
      <ShowImage photo={item.photo} imageStyle="cart-items-image" />
      <div className="cart-items-info">
        <h1 className="cart-items-name">{item.name}</h1>
        <h6 className="cart-items-price">Price: ${item.price} / (1.ct)</h6>
        <h6 className="cart-items-price">
          Total: ${item.totalPrice.toFixed(2)} / ({item.count}.ct)
        </h6>
        <div className="cart-items-actions">
          <button
            className="cart-items-actions-button cart-items-actions-button_add"
            onClick={() => {
              cartContext.increaseExistingProductInCart(item);
              setRun(!run);
            }}
          >
            <FontAwesomeIcon icon={faPlus} />
          </button>
          <button
            className="cart-items-actions-button cart-items-actions-button_minus"
            onClick={() => {
              cartContext.subtractProductFromCart(item._id);
              setRun(!run);
            }}
          >
            <FontAwesomeIcon icon={faMinus} />
          </button>
          <button
            className="cart-items-actions-button cart-items-actions-button_remove"
            onClick={() => {
              cartContext.removeItem(item._id);
              setRun(!run);
            }}
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>
      </div>
    </div>
  );
};
export default CartItems;
