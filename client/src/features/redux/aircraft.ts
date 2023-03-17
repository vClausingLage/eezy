import { createSlice } from "@reduxjs/toolkit";

export const aircraftSlice = createSlice({
  name: "selectedAircraft",
  initialState: {
    value: "",
  },
  reducers: {
    select: (state) => {
      state.value += "hi";
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
    aircraftSelected: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { select, aircraftSelected } = aircraftSlice.actions;

export default aircraftSlice.reducer;
