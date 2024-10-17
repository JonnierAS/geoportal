import { configureStore } from "@reduxjs/toolkit";
import mapReducer from '@/redux/features/mapFeatures'

export const store = configureStore({
    reducer: {
        mapReducer,
    },
    middleware: (getDefaulModdleware) =>
    getDefaulModdleware({
        serializableCheck: false,
    }),
})