import { createSlice, createAsyncThunk, AnyAction, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const API_KEY = "78a110ed1dmshbcfebcdca14633ap13f5ffjsn7c75c6dcf1c0";

// type Props = {
//   page?: number | undefined;
//   category?: number | undefined;
// }

function isActionWithSelectedPayload<T>(action: AnyAction): action is PayloadAction<T> {
  return typeof action.payload === 'object'
}

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  (page: number) => {
    return axios
      .request({
        method: "GET",
        url: "https://asos2.p.rapidapi.com/products/v2/list",
        params: {
          store: "US",
          offset: 24 * page - 1,
          categoryId: "4209",
          limit: "24",
          range: "new_season",
          sort: "freshness",
          currency: "USD",
          sizeSchema: "US",
          lang: "en-US",
        },
        headers: {
          "x-rapidapi-host": "asos2.p.rapidapi.com",
          "x-rapidapi-key": API_KEY,
        },
      })
      .then((response) => response.data.products);
  }
);

export const fetchProductsByCategoryId = createAsyncThunk(
  "products/fetchProductsByCategoryId",
  async (props: any) => {
    const data = await axios
      .request({
        method: "GET",
        url: "https://asos2.p.rapidapi.com/products/v2/list",
        params: {
          store: "US",
          offset: 24 * props?.page - 1,
          categoryId: props?.category,
          limit: "24",
          range: "new_season",
          sort: "freshness",
          currency: "USD",
          sizeSchema: "US",
          lang: "en-US",
        },
        headers: {
          "x-rapidapi-host": "asos2.p.rapidapi.com",
          "x-rapidapi-key": API_KEY,
        },
      })
      .then((response) => response.data.products);
    return data;
  }
);

export const fetchProductItemById = createAsyncThunk(
  "products/fetchProductItemById",
  async (id: string) => {
    const data = await axios
      .request({
        method: "GET",
        url: "https://asos2.p.rapidapi.com/products/v3/detail",
        params: {
          id,
          store: "US",
          lang: "en-US",
          sizeSchema: "US",
          currency: "USD",
        },
        headers: {
          "x-rapidapi-host": "asos2.p.rapidapi.com",
          "x-rapidapi-key": API_KEY,
        },
      })
      .then((response) => response.data)
      .catch((error) => console.error(error));
    return data;
  }
);


type SliceState<T> = {
  products: Array<T>,
  selectedProduct: any,
  categoryId: number,
  categoryName: string,
  loading: boolean,
  error: string | undefined
}

const initialState: SliceState<any> = {
  products: [],
  selectedProduct: [],
  categoryId: 4209,
  categoryName: 'New In',
  loading: false,
  error: "",
}

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    updateCategoryId(state, action) {
      state.categoryId = action.payload;
    },
    updateCategoryName(state, action) {
      state.categoryName = action.payload
    },
    selectProduct(state, action) {
      state.selectedProduct = action.payload;
    },
  },
  extraReducers: (builder) => {
    return (
      builder.addCase(fetchProductsByCategoryId.pending, (state) => {
        state.loading = true;
        // eslint-disable-next-line no-sequences
      }),
      builder.addCase(fetchProductsByCategoryId.fulfilled, (state, action) => {
        state.products = action.payload;
        state.loading = false;
        state.error = "";
      }),
      builder.addCase(fetchProductsByCategoryId.rejected, (state, action) => {
        state.products = [];
        state.loading = false;
        state.error = action.error.message;
      }),
      builder.addCase(fetchProductItemById.pending, (state) => {
        state.loading = true;
        // eslint-disable-next-line no-sequences
      }),
      builder.addCase(fetchProductItemById.fulfilled, (state, action) => {
        state.selectedProduct = action.payload;
        state.loading = false;
        state.error = "";
      }),
      builder.addCase(fetchProductItemById.rejected, (state, action) => {
        state.selectedProduct = [];
        state.loading = false;
        state.error = action.error.message;
      }),
      builder.addMatcher(isActionWithSelectedPayload, (state, action) => {}),
      builder.addDefaultCase((state, action) => {})
    );
  },
});

export const { updateCategoryId, updateCategoryName } = productSlice.actions;
export default productSlice.reducer;
