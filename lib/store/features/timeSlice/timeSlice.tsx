import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface TimeState {
  timeState: string;
}

const initialState: TimeState = {
  timeState: "",
};

export const timeSlice = createSlice({
  name: "time",
  initialState,
  reducers: {
    timeFrame: (state, action) => {
      state.timeState = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { timeFrame } = timeSlice.actions;
export default timeSlice.reducer;
