import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import itemsReducer from "./itemSlice";
import storage from 'redux-persist/lib/storage'; // or whatever storage you are using
import {persistReducer, persistStore} from "redux-persist";

const persistedConfig = {
  key: 'item',
  storage,
}

const persistedReducer = persistReducer(persistedConfig, itemsReducer);

export const store = configureStore({
  reducer: {
    items: persistedReducer,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false, // Disable the serializableCheck for redux-persist compatibility
  }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;