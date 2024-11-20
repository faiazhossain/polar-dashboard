import { createSlice } from '@reduxjs/toolkit';

export interface MapSlice {
  selectedButton: string;
  filteredGeohash: object;
  clickedCoordinates: Array<{ coordinates: [number, number]; rank: number }>;
  highlight: boolean;
  selectedRankFromSlider: Number;
}

const initialState: MapSlice = {
  selectedButton: 'Zone',
  filteredGeohash: [],
  clickedCoordinates: [],
  highlight: false,
  selectedRankFromSlider: 6,
};

export const mapSlice = createSlice({
  name: 'mapdata',
  initialState,
  reducers: {
    setSelectedButton: (state, action) => {
      state.selectedButton = action.payload;
    },
    setFilteredGeohash: (state, action) => {
      state.filteredGeohash = action.payload;
    },
    setSelectedRankFromSlider: (state, action) => {
      state.selectedRankFromSlider = action.payload;
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
    setHighlight: (state, action) => {
      state.highlight = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setSelectedButton,
  setFilteredGeohash,
  addClickedCoordinate,
  clearClickedCoordinates,
  setHighlight,
  setSelectedRankFromSlider,
} = mapSlice.actions;

export default mapSlice.reducer;
