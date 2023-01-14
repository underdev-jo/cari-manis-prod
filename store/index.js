import { configureStore } from "@reduxjs/toolkit";
import calculated from "./slices/calculated";
import popupCalc from "./slices/calculatedPopup";
import calculatedProduct from "./slices/calculatedProduct";

export default configureStore({
  reducer: { calculated, popupCalc, calculatedProduct },
});
