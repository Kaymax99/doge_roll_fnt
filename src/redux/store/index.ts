import { combineReducers, configureStore } from "@reduxjs/toolkit"
import storage from "redux-persist/lib/storage";
import { userReducer } from "../reducers/userReducer";
import { persistReducer } from "redux-persist";

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

const persistConfig = {
    key:"root",
    storage,
}

const rootReducer = combineReducers({
    user: userReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore(
    {
      reducer: persistedReducer,
      middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
    }
)