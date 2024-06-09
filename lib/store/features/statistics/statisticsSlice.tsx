import { createSlice } from "@reduxjs/toolkit";

interface StatisticsData {
  totalPolarOutlet: number;
  poi_count: number;
  suggestion: string;
  keyHighlight: string;
  details: string;
  region: string;
  lng: number;
  lat: number;
}

export interface StatisticsOnClick {
  statistics: StatisticsData;
}

const initialState: StatisticsOnClick = {
  statistics: {
    totalPolarOutlet: 0,
    poi_count: 0,
    suggestion: "",
    keyHighlight: "",
    details: "",
    lng: 0,
    lat: 0,
    region: "",
  },
};

export const statisticsOnClick = createSlice({
  name: "statistics",
  initialState,
  reducers: {
    setStatistics: (state, action) => {
      state.statistics = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setStatistics } = statisticsOnClick.actions;
export default statisticsOnClick.reducer;
