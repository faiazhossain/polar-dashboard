import { configureStore } from "@reduxjs/toolkit";
import timeSlice from "./features/timeSlice/leftPanelSlice";
import leftPanelSlice from "./features/timeSlice/leftPanelSlice";

export const creteStore = () => {
  return configureStore({
    reducer: {
      leftPanel: leftPanelSlice,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof creteStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
