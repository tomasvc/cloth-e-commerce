import { configureStore, combineReducers } from '@reduxjs/toolkit'
import productReducer from '../features/product/productSlice'
import userReducer from '../features/user/userSlice'
import searchReducer from '../features/search/searchSlice'
import categoryReducer from '../features/category/categorySlice'
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
    categories: categoryReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer
})

export const persistor = persistStore(store)