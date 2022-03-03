import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
  },
  reducers: {
    async login(state, action) {
      if (typeof window !== "undefined") {
        localStorage.setItem(
          "jwt",
          JSON.stringify({
            email: action.payload.email,
            password: action.payload.password,
          })
        );
        state.isLoggedIn = true;
      }
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
