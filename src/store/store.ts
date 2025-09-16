import { configureStore } from "@reduxjs/toolkit";
import type { formType } from "./slices/formSlice";
import formSlice from "./slices/formSlice";
import resultsSlice, { type resultsType } from "./slices/resultSlice";

export interface StoreType {
  form: formType;
  results: resultsType;
}

export const store = configureStore({
  reducer: {
    form: formSlice,
    results: resultsSlice,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
