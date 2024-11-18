import { createSlice } from "@reduxjs/toolkit";

export interface MapSlice {
  selectedButton: string;
  filteredGeohash: object;
  clickedCoordinates: Array<[number, number]>; // Array to store [longitude, latitude] pairs
}

const initialState: MapSlice = {
  selectedButton: "Zone",
  filteredGeohash: [],
  clickedCoordinates: [], // Stores multiple clicked coordinates
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
    addClickedCoordinate: (state, action) => {
      state.clickedCoordinates.push(action.payload); // Add a single coordinate to the array
    },
    clearClickedCoordinates: (state) => {
      state.clickedCoordinates = []; // Clear all clicked coordinates
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setSelectedButton,
  setFilteredGeohash,
  addClickedCoordinate,
  clearClickedCoordinates,
} = mapSlice.actions;

export default mapSlice.reducer;
