import { configureStore } from "@reduxjs/toolkit";
import aircraftReducer from "./selectedAircraftSlice";
import savedAircraftReducer from "./savedAircraftSlice";

export default configureStore({
  reducer: {
    selectedAircraft: aircraftReducer,
    savedAircraft: savedAircraftReducer,
  },
});
