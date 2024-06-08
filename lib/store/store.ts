import { configureStore } from "@reduxjs/toolkit";
import timeSlice from "./features/leftPanelSlice/leftPanelDataSlice";
import leftPanelSlice from "./features/leftPanelSlice/leftPanelDataSlice";
import leftPanelPercentageSlice from "./features/leftPanelSlice/leftPanelPercentageSlice";

export const creteStore = () => {
  return configureStore({
    reducer: {
      leftPanel: leftPanelSlice,
      leftPanelPercentage: leftPanelPercentageSlice,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof creteStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
