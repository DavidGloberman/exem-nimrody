import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import roles from "../data/roles.json";

interface RoleReducerStateType {
  role: string;
}
const initialState: RoleReducerStateType = {
  role: "Unknown Personnel",
};

export const RoleReducer = createSlice({
  initialState,
  name: "roleReducer",
  reducers: {
    setRole: (state, action: PayloadAction<number>) => {
      state.role =
        action.payload < roles.length && action.payload >= 0
          ? roles[action.payload]
          : state.role;
    },
  },
});

export const { setRole } = RoleReducer.actions;
export default RoleReducer.reducer;
