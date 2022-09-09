import { createSlice } from "@reduxjs/toolkit";

type CartItem = {
  id: string;
  name: string;
  gender: string;
  color: string;
  images: Array<any>;
  price: number;
  quantity: number;
};

type FavoriteItem = {
  id: string;
  name: string;
  gender: string;
  color: string;
  images: Array<any>;
  price: number;
  quantity: number;
};

type SliceState = {
  cartItems: Array<CartItem>;
  favoriteItems: Array<FavoriteItem>;
  loading: boolean;
  error: string;
};

const initialState: SliceState = {
  cartItems: [],
  favoriteItems: [],
  loading: false,
  error: "",
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart(state, action) {
      const itemExists = state.cartItems.find(
        (item) => item.id === action.payload.id
      );

      state.cartItems = itemExists
        ? state.cartItems.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        : [...state.cartItems, { ...action.payload, quantity: 1 }];
    },
    removeItemFromCart(state, action) {
      const itemExists = state.cartItems.find(
        (item) => item.id === action.payload.id
      );

      itemExists?.quantity === 1
        ? (state.cartItems = state.cartItems.filter(
            (item) => item.id !== action.payload.id
          ))
        : (state.cartItems = state.cartItems.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity - 1 }
              : item
          ));
    },
    clearItemFromCart(state, action) {
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
  clearItemFromCart,
  addItemToFavorites,
  removeItemFromFavorites,
} = cartSlice.actions;
export default cartSlice.reducer;
