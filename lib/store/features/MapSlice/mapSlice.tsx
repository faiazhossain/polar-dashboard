import { createSlice } from "@reduxjs/toolkit";

export interface MapSlice {
  selectedButton: string;
}

const initialState: MapSlice = {
  selectedButton: "Zone",
};

export const mapSlice = createSlice({
  name: "leftPanel",
  initialState,
  reducers: {
    setSelectedButton: (state, action) => {
      state.selectedButton = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setSelectedButton } = mapSlice.actions;
export default mapSlice.reducer;
