import { createSlice } from "@reduxjs/toolkit";

interface Region {
  pId: string | undefined;
  title: string | undefined;
}
interface bbox {
  minLng: number | undefined;
  minLat: number | undefined;
  maxLng: number | undefined;
  maxLat: number | undefined;
}
export interface LeftPanelState {
  timeState: string;
  zoneState: string;
  selectedRegion: Region;
  selectedAffluence: string;
  selectedAgeGroup: string;
  selectedGender: string;
  selectedPriceRange: string;
  boundingBox: bbox;
}

const initialState: LeftPanelState = {
  timeState: "6AM-12PM",
  zoneState: "",
  selectedRegion: { pId: undefined, title: undefined },
  selectedAffluence: "",
  selectedAgeGroup: "",
  selectedGender: "",
  selectedPriceRange: "",
  boundingBox: {
    minLng: undefined,
    minLat: undefined,
    maxLng: undefined,
    maxLat: undefined,
  },
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
    setBoundingBox: (state, action) => {
      state.boundingBox = action.payload;
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
  setBoundingBox,
} = leftPanelSlice.actions;
export default leftPanelSlice.reducer;
