import { configureStore } from "@reduxjs/toolkit";
import aircraftReducer from "./aircraft";

export default configureStore({
  reducer: {
    aircraft: aircraftReducer,
  },
});
