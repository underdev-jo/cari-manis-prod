import {
  addToCalculator,
  delItemCalculator,
  subCalculator,
} from "helpers/addToCalculator";
import Image from "next/image";
import NextImage from "next/image";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProductCalc } from "store/slices/calculatedProduct";

const phClass = `bg-slate-200 animate-pulse rounded-md`;
const minH = "min-h-[16px]";

const Photo = ({ name, image }) => {
  let view = <div className={`h-[72px] w-[72px] ${phClass}`} />;
  if (image) view = <NextImage width={72} height={72} alt={name} src={image} />;
  return <div className="mr-3">{view}</div>;
};

const Info = ({ name, netto, qty, packaging }) => {
  const hasInfo = netto && packaging;

  const nameLoading = `${minH} ${!name ? phClass : ""}`;
  const nameClass = `line-clamp-2 mb-1 text-medium ${nameLoading}`;

  const infoLoading = `${minH} ${!hasInfo ? phClass : ""}`;
  const infoClass = `text-small mb-1 text-carman-gray-3 ${infoLoading}`;

  return (
    <div className="font-medium">
      <div className={nameClass}>{name}</div>
      <div className={infoClass}>{hasInfo && `${netto}ml - ${packaging}`}</div>
    </div>
  );
};

const Nutrition = ({ gula, kalori }) => (
  <div className="flex flex-1 w-[50%] items-center gap-2 text-medium font-medium mb-1 text-carman-gray-2">
    <div className={`${minH} flex-1 mb-2 ${!gula ? phClass : ""}`}>
      {gula && `${gula}gr`}
    </div>
    <div className={`${minH} flex-1 mb-2 ${!kalori ? phClass : ""}`}>
      {kalori && `${kalori}gr`}
    </div>
  </div>
);

const Action = (product) => {
  const [count, setCount] = useState(1);

  const { id, qty = 1, setDeleted } = product;

  const calcProduct = useSelector(
    ({ calculatedProduct }) => calculatedProduct.product
  );

  const dispatch = useDispatch();
  const dispatchCounter = (passCount) => {
    const qty = passCount || count;
    // GET EXIST PRODUCT
    const target = calcProduct.find((i) => i.data[0].id === product.id);
    const tIndex = calcProduct.findIndex((i) => i.data[0].id === product.id);
    const targetProduct = { ...target, data: [{ ...target.data[0], qty }] };
    const newProduct = [...calcProduct];
    newProduct[tIndex] = targetProduct;
    dispatch(setProductCalc(newProduct));
  };

  useEffect(() => {
    setCount(qty);
  }, [qty]);

  const inc = () => {
    if (count < 99) {
      const currCount = parseInt(count, 0) + 1;
      setCount(currCount);
      addToCalculator(product);
      dispatchCounter(currCount);
    }
  };
  const dec = () => {
    if (count > 1) {
      const currCount = parseInt(count, 0) - 1;
      setCount(currCount);
      subCalculator(product);
      dispatchCounter(currCount);
    } else {
      delItemCalculator(product);
      setDeleted(true);
    }
  };

  if (!id) return <div className={`w-[100px] h-6 ${phClass}`} />;

  const isMore = count > 1;

  return (
    <div className="w-1/4">
      <div className="flex">
        <button
          className={`${
            isMore
              ? "border-carman-gray-4 hover:bg-carman-gray-4 hover:border-carman-gray-4 hover:text-white"
              : "bg-carman-red-1 text-white border-carman-red-1 hover:bg-carman-red-1 hover:border-carman-red-1"
          } btn btn-xs btn-outline border rounded-r-none rounded-l`}
          onClick={dec}
        >
          {isMore ? (
            "-"
          ) : (
            <Image
              alt="del"
              src="/icons/fluent_delete-12-regular.svg"
              width={10}
              height={10}
            />
          )}
        </button>
        <div className="w-6 btn btn-xs disabled rounded-none btn-outline text-center border-l-0 border-r-0 border-t-carman-gray-4 border-b-carman-gray-4  pointer-events-none">
          {count}
        </div>
        <button
          className="btn btn-xs btn-outline border border-carman-gray-4 rounded-l-none rounded-r bg-carman-gray-4 text-white hover:bg-carman-gray-3 hover:border-carman-gray-3 hover:text-white"
          onClick={inc}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default function ProductListItem(props) {
  const [deleted, setDeleted] = useState(false);
  const { image } = props;

  if (deleted) return "";

  return (
    <div className="flex w-full items-start mb-5">
      <Photo image={image} />
      <div className="flex-1 mr-3 w-2/3">
        <Info {...props} phClass={phClass} />
        <Nutrition {...props} />
      </div>
      <Action setDeleted={setDeleted} {...props} />
    </div>
  );
}
