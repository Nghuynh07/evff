import ShowImage from './ShowImage';
import {
  removeItem,
  subtractProductFromCart,
  increaseExistingProductInCart,
} from '../cart/cart-helper';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
const CartItems = ({ item, setRun = (f) => f, run }) => {
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
              increaseExistingProductInCart(item);
              setRun(!run);
            }}
          >
            <FontAwesomeIcon icon={faPlus} />
          </button>
          <button
            className="cart-items-actions-button cart-items-actions-button_minus"
            onClick={() => {
              subtractProductFromCart(item._id);
              setRun(!run);
            }}
          >
            <FontAwesomeIcon icon={faMinus} />
          </button>
          <button
            className="cart-items-actions-button cart-items-actions-button_remove"
            onClick={() => {
              removeItem(item._id);
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
