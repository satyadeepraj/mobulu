
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../Features/authSlice';
import productReducer from '../Features/productSlice';
import cartReducer from '../Features/cartSlice';
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";


const persistConfig = {
  key: 'root', 
  storage,
  whitelist: ['auth', 'cart','products'], 
};
const rootReducer = combineReducers({

    auth: authReducer,
    products: productReducer,
    cart: cartReducer,
  });
  const persistedReducer = persistReducer(persistConfig, rootReducer);

  export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false, 
      }),
  });
  export const persistor = persistStore(store);
