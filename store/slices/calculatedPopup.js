import { createSlice } from "@reduxjs/toolkit";

const popupCalc = createSlice({
  name: "popupCalc",
  initialState: {
    popup: false,
    popupDetail: false,
    sugarCount: 0,
    calorieCount: 0,
  },
  reducers: {
    setPopupCalculator: (state, action) => {
      state.popup = action.payload;
    },
    setPopupDetailCalc: (state, action) => {
      state.popupDetail = action.payload;
    },
  },
});

export const { setPopupCalculator, setPopupDetailCalc } = popupCalc.actions;
export default popupCalc.reducer;
