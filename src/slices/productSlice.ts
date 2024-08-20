import {
  createSlice,
  createAsyncThunk,
  AnyAction,
  PayloadAction,
} from "@reduxjs/toolkit";
import axios from "axios";

type Props = {
  page?: number | undefined;
  category?: string | undefined;
};

function isActionWithSelectedPayload<T>(
  action: AnyAction
): action is PayloadAction<T> {
  return typeof action.payload === "object";
}

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  (page: number) => {
    return axios
      .request({
        method: "GET",
        url: "https://asos10.p.rapidapi.com/api/v1/getProductList",
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
          "x-rapidapi-host": "asos10.p.rapidapi.com",
          "x-rapidapi-key": process.env.REACT_APP_RAPIDAPI_KEY,
        },
      })
      .then((response) => response.data.products);
  }
);

export const fetchProductsByCategoryId = createAsyncThunk(
  "products/fetchProductsByCategoryId",
  async (props: Props) => {
    return axios
      .request({
        method: "GET",
        url: "https://asos10.p.rapidapi.com/api/v1/getProductList",
        params: {
          offset: props?.page ? 24 * props?.page - 1 : 24 * 1,
          categoryId: props?.category,
          limit: "24",
          currency: "USD",
          country: "US",
          sizeSchema: "US",
          lang: "en-US",
        },
        headers: {
          "x-rapidapi-host": "asos10.p.rapidapi.com",
          "x-rapidapi-key": process.env.REACT_APP_RAPIDAPI_KEY,
        },
      })
      .then((response) => {
        return response
      });
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
          "x-rapidapi-key": process.env.REACT_APP_RAPIDAPI_KEY,
        },
      })
      .then((response) => response.data.products)
      .catch((error) => console.error(error));
    return data;
  }
);

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
    resetProduct(state) {
      state.selectedProduct = [];
    }
  },
  extraReducers: (builder) => {
    return (
      builder.addCase(fetchProductItemById.pending, (state) => {
        state.loading = true;
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

export const { updateCategoryId, updateCategoryName, selectProduct, resetProduct } = productSlice.actions;
export default productSlice.reducer;
