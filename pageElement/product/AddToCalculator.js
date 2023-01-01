import { addToCalculator } from "helpers/product";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { setCalculatedProduct as setCalc } from "store/slices/calculated";

export default function AddToCalculator({ product }) {
  const dispatch = useDispatch();
  const datas = useSelector(({ calculatedSlices }) => calculatedSlices.product);
  const counter = datas ? datas.length : 0;

  const fnAdd = () => {
    const added = addToCalculator(product);
    dispatch(setCalc(added));
  };

  return (
    <div className="fixed left-0 right-0 bottom-0 py-4">
      <div className="bg-primary w-full flex items-center justify-between mx-auto max-w-xs  rounded-[40px] overflow-hidden">
        <button className="btn btn-ghost block rounded-none text-white flex items-center">
          <Image
            width={24}
            height={24}
            src="/icons/ph_calculator.svg"
            alt="Calculator Icon"
          />
          <span className="badge badge-md badge-primary text-white">
            {counter}
          </span>
        </button>
        <button
          className="btn btn-primary flex-1 block rounded-none bg-carman-black-1 normal-case"
          onClick={fnAdd}
        >
          Tambah ke Kalkulator
        </button>
      </div>
    </div>
  );
}
