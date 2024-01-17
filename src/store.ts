import { configureStore, combineReducers } from '@reduxjs/toolkit'
import productReducer from 'slices/productSlice'
import userReducer from 'slices/userSlice'
import searchReducer from 'slices/searchSlice'
import menuReducer from 'slices/menuSlice'
import cartReducer from 'slices/cartSlice'
import favoriteReducer from './slices/favoriteSlice'
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
    menu: menuReducer,
    cart: cartReducer,
    favorites: favoriteReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({
            serializableCheck: false
        })
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch