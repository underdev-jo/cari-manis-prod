import { createSlice } from "@reduxjs/toolkit";

const popinfoProduct = createSlice({
  name: "popinfoProduct",
  initialState: {
    product: false,
  },
  reducers: {
    setPopProduct: (state, action) => {
      state.product = action.payload;
    },
  },
});

export const { setPopProduct } = popinfoProduct.actions;
export default popinfoProduct.reducer;
