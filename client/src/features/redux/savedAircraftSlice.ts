import { createSlice } from "@reduxjs/toolkit";

export const savedAircraftSlice = createSlice({
  name: "savedAircraft",
  initialState: {
    list: [],
  },
  reducers: {
    savedAircraft: (state, action) => {
      state.list = action.payload;
    },
  },
});

export const { savedAircraft } = savedAircraftSlice.actions;

export default savedAircraftSlice.reducer;
