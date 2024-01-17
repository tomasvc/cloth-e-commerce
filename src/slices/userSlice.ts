import { createSlice } from "@reduxjs/toolkit";
import { User } from "firebase/auth";

type SliceState = {
  user: User | null;
  loading: boolean;
  error: string | undefined;
};

const initialState: SliceState = {
  user: null,
  loading: false,
  error: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userLogin(state, action) {
      state.user = action.payload;
    },
    userLogout(state) {
      state.user = null;
    },
    userError(state, action) {
      state.error = action.payload
    }
  }
});

export const { userLogin, userLogout, userError } = userSlice.actions;
export default userSlice.reducer;
