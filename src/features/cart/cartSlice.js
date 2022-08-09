import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    favoriteItems: [],
    loading: false,
    error: "",
  },
  reducers: {
    addItemToCart(state, action) {
      state.cartItems = [...state.cartItems, action.payload];
    },
    removeItemFromCart(state, action) {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload.id
      );
    },
    addItemToFavorites(state, action) {
      state.favoriteItems = [...state.favoriteItems, action.payload];
    },
    removeItemFromFavorites(state, action) {
      state.favoriteItems = state.favoriteItems.filter(
        (item) => item.id !== action.payload.id
      );
    },
  },
  extraReducers: {},
});

export const {
  addItemToCart,
  removeItemFromCart,
  addItemToFavorites,
  removeItemFromFavorites,
} = cartSlice.actions;
export default cartSlice.reducer;
