import Image from "next/image";
import { useRouter } from "next/router";
import { addToCalculator } from "helpers/addToCalculator";
import { useDispatch, useSelector } from "react-redux";
import { setCalculatedProduct as setCalc } from "store/slices/calculated";

export default function AddToCalculator({ product }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const datas = useSelector(({ calculated }) => calculated.product);
  const counter = datas ? `${datas.total}` : 0;
  const countView = counter > 99 ? `99+` : counter;

  const fnInfo = () => router.push("/kalkulator");

  const fnAdd = () => {
    if (product) {
      const added = addToCalculator(product);
      dispatch(setCalc(added));
    } else fnInfo();
  };

  return (
    <div className="fixed left-0 right-0 bottom-0 py-4">
      <div className="bg-carman-black-1 w-full flex items-center justify-between mx-auto max-w-[300px] rounded-[20px] overflow-hidden p-1 h-[48px]">
        {counter > 0 && (
          <button
            className="btn btn-primary btn-sm rounded-[16px] text-white flex items-center justify-center w-[62px] h-[40px] p-0 gap-1"
            onClick={fnInfo}
          >
            <Image
              width={24}
              height={24}
              src="/icons/ph_calculator.svg"
              alt="Calculator Icon"
            />
            <span className="text-white text-small">{countView}</span>
          </button>
        )}
        <button
          className="btn flex-1 block rounded-none bg-carman-black-1 normal-case text-white"
          onClick={fnAdd}
        >
          {product ? "+ Tambah ke Kalkulator" : "Lihat Kalkulator"}
        </button>
      </div>
    </div>
  );
}
