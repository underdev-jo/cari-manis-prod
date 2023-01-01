import { configureStore } from "@reduxjs/toolkit";
import calculatedSlices from "./slices/calculated";

export default configureStore({
  reducer: { calculatedSlices },
});
