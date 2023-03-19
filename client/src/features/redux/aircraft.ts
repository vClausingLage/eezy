import { createSlice } from "@reduxjs/toolkit";

export const aircraftSlice = createSlice({
  name: "aircraft",
  initialState: {
    object: {},
  },
  reducers: {
    aircraftSelected: (state, action) => {
      state.object = action.payload;
    },
  },
});

export const { aircraftSelected } = aircraftSlice.actions;

export default aircraftSlice.reducer;
