import ShowImage from "./ShowImage";
import classes from "./CartItems.module.css";
import {
  removeItem,
  subtractProductFromCart,
  increaseExistingProductInCart,
} from "../cart/cart-helper";

const CartItems = ({ item, setRun = (f) => f, run }) => {
  return (
    <div className={classes.cartItems}>
      <ShowImage photo={item.photo} imageStyle={classes.cartItemsImage} />
      <div>
        <h1>{item.name}</h1>
        <h6>Price: ${item.price} / (1.ct)</h6>
        <h6>
          Total: ${item.totalPrice.toFixed(2)} / ({item.count}.ct)
        </h6>
        <div className={classes.cartItemsContainer}>
          <button
            onClick={() => {
              increaseExistingProductInCart(item);
              setRun(!run);
            }}
          >
            +
          </button>
          <button
            onClick={() => {
              subtractProductFromCart(item._id);
              setRun(!run);
            }}
          >
            -
          </button>
        </div>
      </div>
      <button
        className={classes.cartItemsRemoveButton}
        onClick={() => {
          removeItem(item._id);
          setRun(!run);
        }}
      >
        Remove
      </button>
    </div>
  );
};
export default CartItems;
