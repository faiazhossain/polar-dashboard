import { createSlice } from '@reduxjs/toolkit';

export interface MapSlice {
  selectedButton: string;
  filteredGeohash: object;
  clickedCoordinates: Array<{ coordinates: [number, number]; rank: number }>; // Store both coordinates and rank
}

const initialState: MapSlice = {
  selectedButton: 'Zone',
  filteredGeohash: [],
  clickedCoordinates: [], // Stores objects with coordinates and rank
};

export const mapSlice = createSlice({
  name: 'leftPanel',
  initialState,
  reducers: {
    setSelectedButton: (state, action) => {
      state.selectedButton = action.payload;
    },
    setFilteredGeohash: (state, action) => {
      state.filteredGeohash = action.payload;
    },
    addClickedCoordinate: (state, action) => {
      const data = new Map(
        state.clickedCoordinates.map((item) => [
          `${item.coordinates[0]},${item.coordinates[1]}`, // Use both longitude and latitude as the key
          item,
        ])
      );

      const key = `${action.payload.coordinates[0]},${action.payload.coordinates[1]}`;
      if (!data.has(key)) {
        data.set(key, action.payload); // Add new unique coordinate
      }

      // Convert Map back to array
      state.clickedCoordinates = Array.from(data.values());
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
