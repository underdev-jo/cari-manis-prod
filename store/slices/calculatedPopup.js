import { createSlice } from "@reduxjs/toolkit";

const popupCalc = createSlice({
  name: "popupCalc",
  initialState: {
    popup: false,
    modalCalculated: false,
    sugarCount: 0,
    calorieCount: 0,
  },
  reducers: {
    setPopupCalculator: (state, action) => {
      state.popup = action.payload;
    },
  },
});

export const { setPopupCalculator } = popupCalc.actions;
export default popupCalc.reducer;
