import { configureStore } from "@reduxjs/toolkit";
import calculated from "./slices/calculated";

export default configureStore({
  reducer: { calculated },
});
