import { createSlice } from "@reduxjs/toolkit";

export interface TimeState {
  timeState: string;
  zoneState: string;
}

const initialState: TimeState = {
  timeState: "",
  zoneState: "",
};

export const timeSlice = createSlice({
  name: "time",
  initialState,
  reducers: {
    timeFrame: (state, action) => {
      state.timeState = action.payload;
    },
    zoneFrame: (state, action) => {
      state.zoneState = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { timeFrame, zoneFrame } = timeSlice.actions;
export default timeSlice.reducer;
