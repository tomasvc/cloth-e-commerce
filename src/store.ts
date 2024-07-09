import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import productReducer from 'slices/productSlice'
import userReducer from 'slices/userSlice'
import searchReducer from 'slices/searchSlice'
import menuReducer from 'slices/menuSlice'
import cartReducer from 'slices/cartSlice'
import favoritesReducer from './slices/favoriteSlice'
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
    favorites: favoritesReducer
})

export const persistedReducer = persistReducer(persistConfig, rootReducer)

export const setupStore = (preloadedState?: RootState) => {
    return configureStore({
      reducer: persistedReducer,
      preloadedState,
      middleware: (getDefaultMiddleware: any) => 
        getDefaultMiddleware({
            serializableCheck: false
        })
    })
  }

export const store = setupStore() as any;

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch