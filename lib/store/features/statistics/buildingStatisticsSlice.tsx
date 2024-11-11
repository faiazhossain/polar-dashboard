import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the interface for the statistics data
interface BuildingStatisticsData {
  poi_info: string;
  lat: number;
  lng: number;
  rank: number;
  region: string;
  locationData: object;
}

// Define the interface for the state
export interface StatisticsOnClick {
  buildingStatistics: BuildingStatisticsData;
  loading: boolean; // Directly use boolean type here
  geohash: string;
}

const initialState: StatisticsOnClick = {
  buildingStatistics: {
    poi_info: "",
    lat: 0,
    lng: 0,
    region: "",
    rank: 0,
    locationData: [],
  },
  loading: false, // Initial state for loading is a boolean
  geohash: "",
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
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload; // Accepts a boolean directly
    },
    setGeohash: (state, action) => {
      state.geohash = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setBuildingStatistics, setLoading, setGeohash } =
  buildingStatisticsOnClick.actions;
export default buildingStatisticsOnClick.reducer;
