import { createSlice } from "@reduxjs/toolkit";

export interface LeftPanelState {
  timeState: string;
  zoneState: string;
  selectedRegion: string;
  selectedAffluence: string;
  selectedAgeGroup: string;
  selectedGender: string;
  selectedPriceRange: string;
}

const initialState: LeftPanelState = {
  timeState: "Day",
  zoneState: "",
  selectedRegion: "",
  selectedAffluence: "",
  selectedAgeGroup: "",
  selectedGender: "",
  selectedPriceRange: "",
};

export const leftPanelSlice = createSlice({
  name: "leftPanel",
  initialState,
  reducers: {
    timeFrame: (state, action) => {
      state.timeState = action.payload;
    },
    zoneFrame: (state, action) => {
      state.zoneState = action.payload;
    },
    setSelectedRegion: (state, action) => {
      state.selectedRegion = action.payload;
    },
    setSelectedAffluence: (state, action) => {
      state.selectedAffluence = action.payload;
    },
    setSelectedAgeGroup: (state, action) => {
      state.selectedAgeGroup = action.payload;
    },
    setSelectedGender: (state, action) => {
      state.selectedGender = action.payload;
    },
    setSelectedPriceRange: (state, action) => {
      state.selectedPriceRange = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  timeFrame,
  zoneFrame,
  setSelectedRegion,
  setSelectedAffluence,
  setSelectedAgeGroup,
  setSelectedGender,
  setSelectedPriceRange,
} = leftPanelSlice.actions;
export default leftPanelSlice.reducer;
