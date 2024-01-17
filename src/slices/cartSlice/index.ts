import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { updateUserCart } from "utils/firebase";
import { getAuth } from "firebase/auth";
import { CartItem, SliceState } from "./types";
import { RootState } from "types";

const initialState: SliceState = {
  items: [],
  loading: false,
  error: "",
};

const addItemToArray = (array: CartItem[], item: CartItem): CartItem[] => {
  const itemExists = array?.find((existingItem) => existingItem.id === item.id);
  return itemExists 
    ? array?.map((existingItem) => 
      existingItem.id === item.id 
        ? { ...existingItem, quantity: existingItem.quantity + 1 } 
        : existingItem
      ) 
    : [...array, { ...item, quantity: 1 }]
}

const removeItemFromArray = (array: CartItem[], item: CartItem): CartItem[] => {
  const itemExists = array?.find((existingItem) => existingItem.id === item.id);

  if (!itemExists) {
    return array;
  }
  
  if (itemExists.quantity === 1) {
    return array?.filter((existingItem) => existingItem.id !== item.id);
  }

  return array.map((existingItem) => 
    existingItem.id === item.id
      ? { ...existingItem, quantity: existingItem.quantity - 1 }
      : existingItem
  );
}

export const addItemToCartThunk = createAsyncThunk(
  'items/addItemToCart',
  async (item: CartItem, { getState, rejectWithValue }) => {
    try {
      const state: RootState = getState() as RootState;
      const updatedCart = addItemToArray(state.cart.items, item);
      
      const auth = getAuth();
      const user: any | null = auth.currentUser;
      if (!user) throw new Error("User not authenticated");

      await updateUserCart(user, updatedCart);
      return updatedCart;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const removeItemFromCartThunk = createAsyncThunk(
  'items/removeItemFromCart',
  async (item: CartItem, { getState, rejectWithValue }) => {
    try {
      const state: RootState = getState() as any; // adjust the type-casting as needed
      const updatedCart = removeItemFromArray(state.cart.items, item);
      const auth = getAuth();
      const user: any | null = auth.currentUser;
      if (!user) throw new Error("User not authenticated");

      await updateUserCart(user, updatedCart); // Assume this function returns a Promise
      return updatedCart;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    updateCartFromFirestore(state, action) {
      state.items = action.payload;
    },
    clearCart(state) {
      state.items = [];
    },
    clearItemFromCart(state, action) {
      state.items = state.items.filter(
        (item) => item.id !== action.payload.id
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addItemToCartThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addItemToCartThunk.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(addItemToCartThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(removeItemFromCartThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeItemFromCartThunk.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(removeItemFromCartThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
  }
});

export const {
  updateCartFromFirestore,
  clearCart,
  clearItemFromCart,
} = cartSlice.actions;
export default cartSlice.reducer;
