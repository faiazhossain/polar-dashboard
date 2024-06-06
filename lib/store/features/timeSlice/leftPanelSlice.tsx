import { createSlice } from "@reduxjs/toolkit";

export interface LeftPanelState {
  timeState: string;
  zoneState: string;
  selectedRegion: string;
  selectedAffluence: string;
  selectedAgeGroup: string;
  selectedAgeGroupPercentage: number;
  genderPercentage: number;
  selectedGender: string;
  selectedPriceRange: string;
}

const initialState: LeftPanelState = {
  timeState: "",
  zoneState: "",
  selectedRegion: "",
  selectedAffluence: "",
  selectedAgeGroup: "",
  selectedAgeGroupPercentage: 50,
  genderPercentage: 50,
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
    setSelectedAgeGroupPercentage: (state, action) => {
      state.selectedAgeGroupPercentage = action.payload;
    },
    setSelectedGender: (state, action) => {
      state.selectedGender = action.payload;
    },
    setSelectedPriceRange: (state, action) => {
      state.selectedPriceRange = action.payload;
    },
    setGenderPercentage: (state, action) => {
      state.genderPercentage = action.payload;
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
  setSelectedAgeGroupPercentage,
  setGenderPercentage,
} = leftPanelSlice.actions;
export default leftPanelSlice.reducer;
