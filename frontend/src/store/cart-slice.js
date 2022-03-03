import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: null,
    totalQuantity: 0,
    changed: false,
  },
  reducers: {
    addItemToCart(state, action) {
      state.items = [];
      if (typeof window !== "undefined") {
        if (localStorage.getItem("cart")) {
          state.items = JSON.parse(localStorage.getItem("cart"));
        }
        const newItem = action.payload;
        const existingItem = state.items.find(
          (item) => item.id === newItem._id
        );
        state.totalQuantity++;
        if (!existingItem) {
          state.items.push({
            ...newItem,
            quantity: 1,
            totalPrice: newItem.price,
          });
        } else {
          existingItem.quantity++;
          existingItem.totalPrice = existingItem.totalPrice + newItem.price;
        }
        localStorage.setItem("cart", JSON.stringify(state.items));
      }
    },
    removeItemFromCart(state, action) {
      if (typeof window !== "undefined") {
        if (localStorage.getItem("cart")) {
          state.items = JSON.parse(localStorage.getItem("cart"));
        }

        // eslint-disable-next-line array-callback-return
        state.items.filter((item) => item._id !== action.payload.id);
        localStorage.setItem("cart", JSON.stringify(state.items));
      }
    },
  },
});
export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
