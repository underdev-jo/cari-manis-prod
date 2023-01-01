import { createSlice } from "@reduxjs/toolkit";

const calculated = createSlice({
  name: "calculated",
  initialState: {
    product: [],
  },
  reducers: {
    setCalculatedProduct: (state, action) => {
      state.product = action.payload;
    },
  },
});

export const { setCalculatedProduct } = calculated.actions;
export default calculated.reducer;
