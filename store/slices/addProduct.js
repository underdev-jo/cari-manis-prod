import { createSlice } from "@reduxjs/toolkit";

const addProduct = createSlice({
  name: "addProduct",
  initialState: {
    popup: false,
    added: false,
  },
  reducers: {
    setPopupAdd: (state, action) => {
      state.popup = action.payload;
    },
    setProductAdd: (state, action) => {
      state.added = action.payload;
    },
  },
});

export const { setPopupAdd, setProductAdd } = addProduct.actions;
export default addProduct.reducer;
