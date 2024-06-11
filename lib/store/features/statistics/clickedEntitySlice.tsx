import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the interface for the data structure
interface ClickedEntityData {
  type: "zone" | "building";
}

// Define the interface for the state
export interface ClickedEntityState {
  clickedEntity: ClickedEntityData | null;
}

const initialState: ClickedEntityState = {
  clickedEntity: null,
};

export const clickedEntitySlice = createSlice({
  name: "clickedEntity",
  initialState,
  reducers: {
    setClickedEntity: (state, action: PayloadAction<ClickedEntityData>) => {
      state.clickedEntity = action.payload;
    },
    clearClickedEntity: (state) => {
      state.clickedEntity = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setClickedEntity, clearClickedEntity } =
  clickedEntitySlice.actions;
export default clickedEntitySlice.reducer;
