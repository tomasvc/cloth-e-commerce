import { createSlice } from "@reduxjs/toolkit";
import { updateUserCart, updateUserFavorites } from "utils/firebase";
import { getAuth } from "firebase/auth";

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
    updateCartFromFirestore(state, action) {
      state.cartItems = action.payload;
    },
    clearCart(state) {
      state.cartItems = [];
    },
    addItemToCart(state, action) {
      const itemExists = state.cartItems?.find(
        (item) => item.id === action.payload.id
      );

      const auth = getAuth();

      state.cartItems = itemExists
        ? state?.cartItems?.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        : state?.cartItems?.length
        ? [...state.cartItems, { ...action.payload, quantity: 1 }]
        : [{ ...action.payload, quantity: 1 }];

      auth.currentUser && updateUserCart(auth.currentUser, state.cartItems);
    },
    removeItemFromCart(state, action) {
      const itemExists = state.cartItems.find(
        (item) => item.id === action.payload.id
      );

      const auth = getAuth();

      itemExists?.quantity === 1
        ? (state.cartItems = state.cartItems.filter(
            (item) => item.id !== action.payload.id
          ))
        : (state.cartItems = state.cartItems.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity - 1 }
              : item
          ));

      auth.currentUser && updateUserCart(auth.currentUser, state.cartItems);
    },
    clearItemFromCart(state, action) {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload.id
      );
    },
    updateFavoritesFromFirestore(state, action) {
      state.favoriteItems = action.payload;
    },
    addItemToFavorites(state, action) {
      const itemExists = state.favoriteItems?.find(
        (item) => item.id === action.payload.id
      );

      const auth = getAuth();

      if (!itemExists) { 
        if (state.favoriteItems.length) {
          state.favoriteItems = [...state.favoriteItems, {...action.payload}] 
        } else {
          state.favoriteItems = [{...action.payload}]
        }
      }
      auth.currentUser && updateUserFavorites(auth.currentUser, state.favoriteItems);
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
  updateCartFromFirestore,
  updateFavoritesFromFirestore,
  clearCart,
  addItemToCart,
  removeItemFromCart,
  clearItemFromCart,
  addItemToFavorites,
  removeItemFromFavorites,
} = cartSlice.actions;
export default cartSlice.reducer;
