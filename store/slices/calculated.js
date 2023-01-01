import { createSlice } from "@reduxjs/toolkit";

const calculatedSlices = createSlice({
  name: "calculatedSlices",
  initialState: {
    product: [],
  },
  reducers: {
    setCalculatedProduct: (state, action) => {
      state.product = action.payload;
    },
  },
});

export const { setCalculatedProduct } = calculatedSlices.actions;
export default calculatedSlices.reducer;
