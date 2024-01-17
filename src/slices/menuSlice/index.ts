import { createSlice } from "@reduxjs/toolkit";
  
type SliceState = {
  menu: any;
  loading: boolean;
  error: string | undefined;
};

const initialState: SliceState = {
  menu: [],
  loading: false,
  error: "",
};

export const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {}
});

export default menuSlice.reducer;
