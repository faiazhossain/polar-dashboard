import { configureStore } from "@reduxjs/toolkit";
import timeSlice from "./features/timeSlice/timeSlice";

export const creteStore = () => {
  return configureStore({
    reducer: {
      time: timeSlice,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof creteStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
