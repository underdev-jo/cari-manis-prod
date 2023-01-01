import { getCookie } from "helpers/util";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCalculatedProduct as setProduct } from "store/slices/calculated";

export default function useProductCalculator() {
  const calculated = getCookie("calculated");

  const dispatch = useDispatch();

  useEffect(() => {
    let product = { product: [], total: 0 };
    if (calculated) product = JSON.parse(calculated);
    dispatch(setProduct(product));
  }, [calculated, dispatch]);
}
