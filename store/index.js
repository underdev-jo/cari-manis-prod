import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import calculated from "./slices/calculated";
import popupCalc from "./slices/calculatedPopup";
import calculatedProduct from "./slices/calculatedProduct";
import popInfoProduct from "./slices/popinfo-product";
import modalFilter from "./slices/modal-filter";
import addProduct from "./slices/addProduct";

export default configureStore({
  middleware: () =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["modalFilter/setModalFilter"],
      },
    }),
  reducer: {
    calculated,
    popupCalc,
    calculatedProduct,
    popInfoProduct,
    modalFilter,
    addProduct,
  },
});
