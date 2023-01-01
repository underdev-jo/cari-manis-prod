import { getCookie } from "helpers/util";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCalculatedProduct as setProduct } from "store/slices/calculated";

export default function useProductCalculator() {
  const calculated = getCookie("calculated");

  const dispatch = useDispatch();

  useEffect(() => {
    let product = [];
    if (calculated) product = JSON.parse(calculated);
    dispatch(setProduct(product));
  }, [calculated, dispatch]);
}
