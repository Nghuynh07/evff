import { createContext } from 'react';

export const CartContext = createContext({
  getCart: () => {},
  addItem: () => {},
  removeItem: () => {},
  subtractProductFromCart: (itemID) => {},
  increaseExistingProductInCart: (item) => {},
  itemTotal: () => {},
});

export const CartProvider = ({ children }) => {
  //GET CART

  const getCart = () => {
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('cart')) {
        return JSON.parse(localStorage.getItem('cart'));
      }
    }
  };
  //ADD ITEm
  const addItem = (item) => {
    let cart = [];
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'));
      }

      const existingProduct = cart.find((product) => product._id === item._id);

      if (!existingProduct) {
        cart.push({
          ...item,
          count: 1,
          totalPrice: item.price,
        });
      } else {
        existingProduct.count++;
        existingProduct.totalPrice = existingProduct.totalPrice + item.price;
      }

      localStorage.setItem('cart', JSON.stringify(cart));
      getCart();
    }
  };

  //REMOVE ITEM
  const removeItem = (productId) => {
    let cart = [];
    console.log(cart);
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'));
      }
      const currentItemInProduct = cart.filter(
        (product) => product._id === productId
      );

      cart.splice(currentItemInProduct, 1);

      localStorage.setItem('cart', JSON.stringify(cart));
      getCart();
    }
  };

  //SUBTRACT ITEM
  const subtractProductFromCart = (itemID) => {
    let cart = [];
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'));
      }

      const existingProduct = cart.find((product) => product._id === itemID);

      if (existingProduct) {
        if (existingProduct.count === 1) {
          cart.splice(existingProduct, 1);
        } else {
          existingProduct.count--;
          existingProduct.totalPrice =
            existingProduct.totalPrice - existingProduct.price;
        }
      }

      localStorage.setItem('cart', JSON.stringify(cart));
      getCart();
    }
  };
  //INCREASING EXISTING ITEM
  const increaseExistingProductInCart = (item) => {
    let cart = [];
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'));
      }
    }
    const existingProduct = cart.find((product) => product._id === item._id);

    existingProduct.count++;
    existingProduct.totalPrice = existingProduct.totalPrice + item.price;

    localStorage.setItem('cart', JSON.stringify(cart));
    getCart();
  };

  //ITEM TOTAL
  const itemTotal = () => {
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('cart')) {
        return JSON.parse(localStorage.getItem('cart')).length;
      }
    }
    return 0;
  };

  const values = {
    addItem,
    subtractProductFromCart,
    increaseExistingProductInCart,
    removeItem,
    itemTotal,
    getCart,
  };

  return <CartContext.Provider value={values}>{children}</CartContext.Provider>;
};
