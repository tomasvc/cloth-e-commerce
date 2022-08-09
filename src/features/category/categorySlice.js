import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCategories } from "../../firebase";

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async () => {
    const data = await getCategories()
    return data
  }
);

export const categorySlice = createSlice({
  name: "categories",
  initialState: {
    categories: [],
    loading: false,
    error: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    return (
      builder.addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        // eslint-disable-next-line no-sequences
      }),
      builder.addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.loading = false;
        state.error = "";
      }),
      builder.addCase(fetchCategories.rejected, (state, action) => {
        state.categories = [];
        state.loading = false;
        state.error = action.error.message;
      })
    );
  },
});

export const { fetch } = categorySlice.actions;
export default categorySlice.reducer;
