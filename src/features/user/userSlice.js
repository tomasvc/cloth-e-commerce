import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        loading: false,
        error: ''
    },
    reducers: {
        userLogin(state, action) {
            state.user = action.payload
        }
    },
    extraReducers: {

    }
})

export const { userLogin } = userSlice.actions;
export default userSlice.reducer;