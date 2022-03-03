import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cart-slice";
import uiReducer from "./cart-slice";
import authReducer from "./auth-slice";
export const store = configureStore({
  reducer: { cart: cartReducer, ui: uiReducer, auth: authReducer },
});
