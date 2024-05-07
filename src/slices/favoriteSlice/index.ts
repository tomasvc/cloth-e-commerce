import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { updateUserFavorites } from "utils/firebase";
import { getAuth } from "firebase/auth";
import { CartItem, SliceState } from "./types";
import { RootState } from "types";

const initialState: SliceState = {
  items: [],
  loading: false,
  error: "",
  actionCompleted: null,
};

const addItemToArray = (array: CartItem[], item: CartItem): CartItem[] => {
  const itemExists = array?.find((existingItem) => existingItem.id === item.id);
  if (!itemExists) {
    return [...array, { ...item }];
  } else {
    return array;
  }
}

const removeItemFromArray = (array: CartItem[], item: CartItem): CartItem[] => {
  const itemExists = array?.find((existingItem) => existingItem.id === item.id);
  if (!itemExists) {
    return array;
  } else {
    return array?.filter((existingItem) => existingItem.id !== item.id);
  }

}

export const addItemToFavoritesThunk = createAsyncThunk(
  'favorites/addItemToFavorites',
  async (item: CartItem, { getState, rejectWithValue }) => {
    try {
      const state: RootState = getState() as RootState;
      const updatedFavorites = addItemToArray(state.favorites.items, item);
      const auth = getAuth();
      const user: any | null = auth.currentUser;
      if (!user) throw new Error("User not authenticated");

      await updateUserFavorites(user, updatedFavorites);
      return updatedFavorites;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const removeItemFromFavoritesThunk = createAsyncThunk(
  'items/removeItemFromFavorites',
  async (item: CartItem, { getState, rejectWithValue }) => {
    try {
      const state: RootState = getState() as any;
      const updatedFavorites = removeItemFromArray(state.favorites.items, item);
      const auth = getAuth();
      const user: any | null = auth.currentUser;
      if (!user) throw new Error("User not authenticated");

      await updateUserFavorites(user, updatedFavorites);
      return updatedFavorites;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);


export const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    clearFavorites(state) {
      state.items = [];
    },
    clearItemFromFavorites(state, action) {
      state.items = state.items.filter(
        (item: any) => item.id !== action.payload.id
      );
    },
    updateFavoritesFromFirestore(state, action) {
      state.items = action.payload;
    },
    resetFavoriteActionCompletedFlag(state) {
      state.actionCompleted = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(addItemToFavoritesThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addItemToFavoritesThunk.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
        state.actionCompleted = 'add';
      })
      .addCase(addItemToFavoritesThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(removeItemFromFavoritesThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeItemFromFavoritesThunk.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
        state.actionCompleted = 'remove';
      })
      .addCase(removeItemFromFavoritesThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
  }
});

export const {
  updateFavoritesFromFirestore,
  clearFavorites,
  clearItemFromFavorites,
  resetFavoriteActionCompletedFlag
} = favoritesSlice.actions;
export default favoritesSlice.reducer;
