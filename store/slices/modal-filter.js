import { createSlice } from "@reduxjs/toolkit";

const modalFilter = createSlice({
  name: "modalFilter",
  initialState: {
    modal: false,
    view: false,
  },
  reducers: {
    setModalFilter: (state, { payload }) => {
      state.modal = payload.modal;
      state.view = payload.view;
    },
  },
});

export const { setModalFilter } = modalFilter.actions;
export default modalFilter.reducer;
