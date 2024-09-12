import { persistReducer, persistStore } from "redux-persist";
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import usersReducer from "../features/users/usersSlice";
import userReducer from "../features/user/userSlice"
import productReducer from "../features/products/productSlice";
import categoriesReducer from "../features/categories/categoriesSlice";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  users: usersReducer,
  user: userReducer,
  products: productReducer,
  categories: categoriesReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

export const persistor = persistStore(store);
