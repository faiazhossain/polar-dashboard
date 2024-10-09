import { createSlice } from "@reduxjs/toolkit";

export interface LeftPanelPercentageState {
  selectedAgeGroupPercentage: number;
  genderPercentage: number;
  affluencePercentage: number;
}

const initialState: LeftPanelPercentageState = {
  selectedAgeGroupPercentage: 100,
  genderPercentage: 100,
  affluencePercentage: 100,
};

export const leftPanelSlice = createSlice({
  name: "leftPanel",
  initialState,
  reducers: {
    setSelectedAgeGroupPercentage: (state, action) => {
      state.selectedAgeGroupPercentage = action.payload;
    },
    setGenderPercentage: (state, action) => {
      state.genderPercentage = action.payload;
    },
    setAffluencePercentage: (state, action) => {
      state.affluencePercentage = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setSelectedAgeGroupPercentage,
  setGenderPercentage,
  setAffluencePercentage,
} = leftPanelSlice.actions;
export default leftPanelSlice.reducer;
