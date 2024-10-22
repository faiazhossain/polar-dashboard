import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// Define the interface for the statistics data
interface StatisticsData {
  "18-24": number;
  "25-34": number;
  "35-49": number;
  "50": number;
  DayCount: number;
  NightCount: number;
  F: number;
  High: number;
  M: number;
  Mid: number;
  Ultra_High: number;
  details: string;
  geohash: string;
  lat: number;
  lng: number;
  low: number;
  poi_count: string;
  region: string;
}

// Define the interface for the state
export interface StatisticsOnClick {
  statistics: StatisticsData;
}

const initialState: StatisticsOnClick = {
  statistics: {
    "18-24": 0,
    "25-34": 0,
    "35-49": 0,
    "50": 0,
    DayCount: 0,
    NightCount: 0,
    F: 0,
    High: 0,
    M: 0,
    Mid: 0,
    Ultra_High: 0,
    details: "",
    geohash: "",
    lat: 0,
    lng: 0,
    low: 0,
    poi_count: "",
    region: "",
  },
};

export const statisticsOnClick = createSlice({
  name: "statistics",
  initialState,
  reducers: {
    setStatistics: (state, action: PayloadAction<StatisticsData>) => {
      state.statistics = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setStatistics } = statisticsOnClick.actions;
export default statisticsOnClick.reducer;
