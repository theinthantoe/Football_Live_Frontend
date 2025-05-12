import {configureStore} from "@reduxjs/toolkit";
import authSlice from "../pages/Auth/authSlice.js";
import {baseApi} from "./baseApi.js";

const store = configureStore({
    reducer: {
        auth : authSlice,
        [baseApi.reducerPath]: baseApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(baseApi.middleware),
});

export default store;