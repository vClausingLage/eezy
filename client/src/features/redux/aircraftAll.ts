import { createSlice } from "@reduxjs/toolkit";

export const aircraftAllSlice = createSlice({
  name: "aircraftAll",
  initialState: {
    list: [],
  },
  reducers: {
    aircraftAll: (state, action) => {
      state.list = [...state.list, action.payload];
    },
  },
});

export const { aircraftAll } = aircraftAllSlice.actions;

export default aircraftAllSlice.reducer;
