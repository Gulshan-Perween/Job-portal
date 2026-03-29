import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import jobSlice from "./jobSlice";
import companySlice from "./companySlice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import storage from "redux-persist/lib/storage";

// Fix: persistConfig should be an object, not a function returning object
const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

// Fix: combineReducers syntax (use parentheses, not braces alone)
const rootReducer = combineReducers({
  auth: authSlice,
  job: jobSlice,
  company: companySlice,
});

// Apply persistReducer to rootReducer with persistConfig
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer, // pass persistedReducer here
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export default store;
