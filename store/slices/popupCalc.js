import { createSlice } from "@reduxjs/toolkit";

const popupCalc = createSlice({
  name: "popupCalc",
  initialState: {
    popup: false,
  },
  reducers: {
    setPopupCalculator: (state, action) => {
      state.popup = action.payload;
    },
  },
});

export const { setPopupCalculator } = popupCalc.actions;
export default popupCalc.reducer;
