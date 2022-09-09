import { configureStore, combineReducers } from '@reduxjs/toolkit'
import productReducer from 'slices/productSlice'
import userReducer from 'slices/userSlice'
import searchReducer from 'slices/searchSlice'
import categoryReducer from 'slices/categorySlice'
import cartReducer from 'slices/cartSlice'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'


const persistConfig = {
    key: 'root',
    storage
}

const rootReducer = combineReducers({
    user: userReducer,
    products: productReducer,
    search: searchReducer,
    categories: categoryReducer,
    cart: cartReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch