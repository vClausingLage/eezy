import { configureStore } from "@reduxjs/toolkit";
import aircraftReducer from "./aircraft";
import aircraftAllReducer from "./aircraftAll";

export default configureStore({
  reducer: {
    aircraft: aircraftReducer,
    aircraftAll: aircraftAllReducer,
  },
});
