import { createSlice } from "@reduxjs/toolkit";

export interface MapSlice {
  selectedButton: string;
  filteredGeohash: object;
}

const initialState: MapSlice = {
  selectedButton: "Zone",
  filteredGeohash: [],
};

export const mapSlice = createSlice({
  name: "leftPanel",
  initialState,
  reducers: {
    setSelectedButton: (state, action) => {
      state.selectedButton = action.payload;
    },
    setFilteredGeohash: (state, action) => {
      state.filteredGeohash = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setSelectedButton, setFilteredGeohash } = mapSlice.actions;
export default mapSlice.reducer;
