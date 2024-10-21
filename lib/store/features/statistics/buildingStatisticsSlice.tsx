import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// Define the interface for the statistics data
interface BuildingStatisticsData {
  poi_info: string;
  lat: number;
  lng: number;
  poi_count: number;
  rank: number;
  region: string;
}

// Define the interface for the state
export interface StatisticsOnClick {
  buildingStatistics: BuildingStatisticsData;
}

const initialState: StatisticsOnClick = {
  buildingStatistics: {
    poi_info: "",
    lat: 0,
    lng: 0,
    poi_count: 0,
    region: "",
    rank: 0,
  },
};

export const buildingStatisticsOnClick = createSlice({
  name: "statistics",
  initialState,
  reducers: {
    setBuildingStatistics: (
      state,
      action: PayloadAction<BuildingStatisticsData>
    ) => {
      state.buildingStatistics = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setBuildingStatistics } = buildingStatisticsOnClick.actions;
export default buildingStatisticsOnClick.reducer;
