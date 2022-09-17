import {
  createSlice,
  createAsyncThunk,
  AnyAction,
  PayloadAction,
} from "@reduxjs/toolkit";
import { getCategories } from "utils/firebase";

// type Category = {
//   id: number,
//   name: string
// }

// type Categories = {
//   items: Array<Category>
// }

type SliceState = {
  categories: any;
  loading: boolean;
  error: string | undefined;
};

const initialState: SliceState = {
  categories: [],
  loading: false,
  error: "",
};

function isActionWithCategoriesPayload<T>(
  action: AnyAction
): action is PayloadAction<T> {
  return typeof action.payload === "object";
}

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async () => {
    const data = await getCategories();
    return data;
  }
);

export const categorySlice = createSlice({
  name: "categories",
  initialState,
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
      }),
      builder.addMatcher(isActionWithCategoriesPayload, (state, action) => {}),
      builder.addDefaultCase((state, action) => {})
    );
  },
});

// export const { fetch } = categorySlice.actions;
export default categorySlice.reducer;
