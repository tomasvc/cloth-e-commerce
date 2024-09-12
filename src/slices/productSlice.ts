import {
  createSlice,
  Action,
  PayloadAction,
} from "@reduxjs/toolkit";

function isActionWithSelectedPayload<T>(
  action: Action
): action is PayloadAction<T> {
  return 'payload' in action && typeof (action as PayloadAction<T>).payload === "object";
}

type SliceState<T> = {
  products: Array<T>;
  selectedProduct: any;
  categoryId: number;
  categoryName: string;
  loading: boolean;
  error: string | undefined;
};

const initialState: SliceState<any> = {
  products: [],
  selectedProduct: [],
  categoryId: 4209,
  categoryName: "New In",
  loading: false,
  error: "",
};

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    updateCategoryId(state, action) {
      state.categoryId = action.payload;
    },
    updateCategoryName(state, action) {
      state.categoryName = action.payload;
    },
    selectProduct(state, action) {
      state.selectedProduct = action.payload;
    },
    resetSelectedProduct(state) {
      state.selectedProduct = [];
    }
  },
  extraReducers: (builder) => {
    return (
      builder.addMatcher(isActionWithSelectedPayload, (state, action) => {}),
      builder.addDefaultCase((state, action) => {})
    );
  },
});

export const { updateCategoryId, updateCategoryName, selectProduct, resetSelectedProduct } = productSlice.actions;
export default productSlice.reducer;
