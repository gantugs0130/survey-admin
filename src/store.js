// file: store.ts
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./slice//reducer";

export default function configureReducer(initialState) {
    return configureStore({
        reducer: rootReducer,
        devTools: process.env.NODE_ENV !== "production",
        preloadedState: initialState,
    });
}
