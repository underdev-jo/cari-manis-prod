import Button from "components/Button";
import { slugify } from "helpers/util";
import { addToCalculator } from "helpers/addToCalculator";
import Image from "next/image";
import { Close } from "public/icons";
import IconPlus from "public/icons/icon-plus";
import { useDispatch, useSelector } from "react-redux";
import { setPopProduct } from "store/slices/popinfo-product";
import { useState } from "react";
import { useRouter } from "next/router";
import { setCalculatedProduct } from "store/slices/calculated";

const NutriBox = ({ title, value }) => (
  <div className="rounded-lg border border-carman-blue-10 text-carman-blue-1 p-4 flex items-center justify-center text-center w-1/3">
    <div>
      <div className="text-medium font-bold">{title}</div>
      <div className="text-large">{value}</div>
    </div>
  </div>
);

export default function PopInfo() {
  const [added, setAdded] = useState(false);
  const product = useSelector(({ popInfoProduct }) => popInfoProduct.product);

  const dispatch = useDispatch();
  const router = useRouter();

  const close = () => {
    dispatch(setPopProduct(false));
    setAdded(false);
  };

  const productUrl = product ? `/${slugify(product.name)}/${product.id}` : "/";
  const navToProduct = () => {
    close();
    router.push(productUrl);
  };

  const navToCalculator = () => {
    close();
    router.push("/kalkulator");
  };

  const add = () => {
    setAdded(true);
    const added = addToCalculator(product);
    dispatch(setCalculatedProduct(added));
  };

  const btnAdd = (
    <Button onClick={add} model="white" size="small">
      <IconPlus /> Tambah
    </Button>
  );

  const btnToCalc = (
    <Button size="small" onClick={navToCalculator}>
      Lihat Kalkulator
    </Button>
  );

  const defClass =
    "fixed top-[50%] left-[50%] bg-white min-h-[20vh] w-[80vw] max-w-sm rounded-[20px] -translate-x-[50%] transition-all shadow-xl z-50";
  const actClass = product
    ? "-translate-y-[50%] opacity-100"
    : "-translate-y-[40%] opacity-0 pointer-events-none";
  const fullClass = `${defClass} ${actClass}`;

  return (
    <>
      {product && (
        <div
          className="bg-primary-content opacity-70 fixed left-0 top-0 h-screen w-screen z-50"
          onClick={close}
        />
      )}
      <div className={fullClass}>
        <div className="relative">
          <div className="relative py-6 px-5">
            <div className="mb-3">
              <div className="mb-2">
                <div className="relative w-[157px] h-[157px] bg-slate-400 mx-auto">
                  {product.image && (
                    <Image
                      alt={product.name}
                      src={product.image}
                      layout="fill"
                      quality={50}
                    />
                  )}
                </div>
              </div>
              <div className="text-large font-medium text-carman-gray-2 line-clamp-1 text-center">
                {product.name}
              </div>
            </div>
            <div className="mb-2">
              <div className="flex items-center justify-between gap-2 max-w-xs mx-auto">
                <NutriBox
                  title="Netto"
                  value={`${product.netto}${
                    product.packaging === "Sachet" ? "gr" : "ml"
                  }`}
                />
                <NutriBox title="Gula" value={`${product.gula}gr`} />
                <NutriBox title="Kalori" value={`${product.kalori}kkal`} />
              </div>
            </div>
          </div>
          <div className="max-w-[210px] mx-auto flex items-center justify-center gap-2 mb-6">
            {added ? btnToCalc : btnAdd}
            <Button model="blue" size="small" onClick={navToProduct}>
              Lihat Detail
            </Button>
          </div>
          <button
            className="btn btn-circle btn-sm cursor-pointer text-white absolute right-[10px] top-[10px]"
            onClick={close}
          >
            <Close size={18} />
          </button>
        </div>
      </div>
    </>
  );
}
