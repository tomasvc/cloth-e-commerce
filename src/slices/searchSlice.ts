import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_KEY = "78a110ed1dmshbcfebcdca14633ap13f5ffjsn7c75c6dcf1c0";

export const fetchResults = createAsyncThunk(
  "products/searchProducts",
  (query) => {
    return axios
      .request({
        method: "GET",
        url: "https://asos2.p.rapidapi.com/products/v2/autocomplete",
        params: {
          q: query,
          store: "US",
          country: "US",
          currency: "USD",
          sizeSchema: "US",
          lang: "en-US",
        },
        headers: {
          "x-rapidapi-host": "asos2.p.rapidapi.com",
          "x-rapidapi-key": API_KEY,
        },
      })
      .then((response) => response.data);
  }
);

type SliceState = {
  results: any;
  loading: boolean;
  error: string | undefined;
};

const initialState: SliceState = {
  results: [],
  loading: false,
  error: "",
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    updateResults(state, action) {
      state.results = action.payload
    },
    clearResults(state) {
      state.results = []
    }
  },
  extraReducers: (builder) => {
    return (
      builder.addCase(fetchResults.pending, (state) => {
        state.loading = true;
        // eslint-disable-next-line no-sequences
      }),
      builder.addCase(fetchResults.fulfilled, (state, action) => {
        state.results = action.payload;
        state.loading = false;
        state.error = "";
      }),
      builder.addCase(fetchResults.rejected, (state, action) => {
        state.results = [];
        state.loading = false;
        state.error = action.error.message;
      })
    );
  },
});

export const { updateResults, clearResults } = searchSlice.actions;
export default searchSlice.reducer;
