import { configureStore } from "@reduxjs/toolkit";
import timeSlice from "./features/leftPanelSlice/leftPanelDataSlice";
import leftPanelSlice from "./features/leftPanelSlice/leftPanelDataSlice";
import leftPanelPercentageSlice from "./features/leftPanelSlice/leftPanelPercentageSlice";
import statisticsOnClick from "./features/statistics/zoneStatisticsSlice";
import MapSlice from "./features/MapSlice/mapSlice";
import buildingStatisticsSlice from "./features/statistics/buildingStatisticsSlice";
import clickedEntitySlice from "./features/statistics/clickedEntitySlice";

export const creteStore = () => {
  return configureStore({
    reducer: {
      leftPanel: leftPanelSlice,
      leftPanelPercentage: leftPanelPercentageSlice,
      statistics: statisticsOnClick,
      buildingstatistics: buildingStatisticsSlice,
      mapdata: MapSlice,
      clickedEntitySlice: clickedEntitySlice,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof creteStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
