import { createSlice } from "@reduxjs/toolkit";

const productCalc = createSlice({
  name: "productCalc",
  initialState: {
    product: false,
  },
  reducers: {
    setProductCalc: (state, action) => {
      state.product = action.payload;
    },
  },
});

export const { setProductCalc, setProductQty } = productCalc.actions;
export default productCalc.reducer;
