import { configureStore } from "@reduxjs/toolkit";
import RoleReducer from "./RoleReducer";
import FloorReducer from "./FloorReducer";

export const store = configureStore({
  reducer: {
    role: RoleReducer,
    floorAccess: FloorReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
