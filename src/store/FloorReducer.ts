import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FloorReducerStateType {
  floorAccess: boolean[];
}
const initialState: FloorReducerStateType = {
  floorAccess: [true, false, false, false, false],
};

export const FloorReducer = createSlice({
  initialState,
  name: "floorReducer",
  reducers: {
    changeAccess: (state, action: PayloadAction<number>) => {
      state.floorAccess[action.payload] = !state.floorAccess[action.payload];
    },
  },
});

export const { changeAccess } = FloorReducer.actions;
export default FloorReducer.reducer;
