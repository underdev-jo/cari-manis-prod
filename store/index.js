import { configureStore } from "@reduxjs/toolkit";
import calculated from "./slices/calculated";
import popupCalc from "./slices/popupCalc";

export default configureStore({
  reducer: { calculated, popupCalc },
});
