export const addItem = (item) => {
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
  }
};

export const removeItem = (productId) => {
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
  }
};

export const subtractProductFromCart = (itemID) => {
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
  }
};

export const increaseExistingProductInCart = (item) => {
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
};

export const itemTotal = () => {
  if (typeof window !== 'undefined') {
    if (localStorage.getItem('cart')) {
      return JSON.parse(localStorage.getItem('cart')).length;
    }
  }
  return 0;
};

export const getCart = () => {
  if (typeof window !== 'undefined') {
    if (localStorage.getItem('cart')) {
      return JSON.parse(localStorage.getItem('cart'));
    }
  }
};

export const updateItem = (productId, count) => {
  let cart = [];
  if (typeof window !== 'undefined') {
    if (localStorage.getItem('cart')) {
      cart = JSON.parse(localStorage.getItem('cart'));
    }
    // eslint-disable-next-line array-callback-return
    cart.map((product, index) => {
      if (product._id === productId) {
        cart[index].count = count;
      }
    });

    localStorage.setItem('cart', JSON.stringify(cart));
  }
};
