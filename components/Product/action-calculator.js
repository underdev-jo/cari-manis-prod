import {
  addToCalculator,
  delItemCalculator,
  subCalculator,
} from "helpers/addToCalculator";
import FluentDeleteIcon from "public/icons/FluentDeleteIcon";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProductCalc } from "store/slices/calculatedProduct";

const phClass = `bg-slate-200 animate-pulse rounded-md`;

const ActionCalculator = (product) => {
  const [count, setCount] = useState(1);

  const { id, qty = 1, setDeleted } = product;

  const calcProduct = useSelector(
    ({ calculatedProduct }) => calculatedProduct.product
  );

  const dispatch = useDispatch();
  const dispatchCounter = (passCount) => {
    //DEFINE
    const qty = passCount || count;
    const newProduct = [...calcProduct];

    // GET EXIST PRODUCT
    const target = calcProduct.find((i) => i.data[0].id === product.id);
    const tIndex = calcProduct.findIndex((i) => i.data[0].id === product.id);

    //MANAGING PROPS
    const newProps = {
      qty,
      xSug: target.data[0].gula * qty,
      xCal: target.data[0].kalori * qty,
    };
    const newData = { ...target.data[0], ...newProps };
    const targetProduct = { ...target, data: [newData] };

    if (passCount === 0) newProduct.splice(tIndex, 1);
    else newProduct[tIndex] = targetProduct;
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
      dispatchCounter(0);
      delItemCalculator(product);
      // setDeleted(true);
    }
  };

  if (!id) return <div className={`w-[100px] h-6 ${phClass}`} />;

  const isMore = count > 1;

  const delBtn = `btn btn-xs btn-outline border rounded-r-none rounded-l`;
  let delBtnMore =
    "bg-carman-red-1 text-white border-carman-red-1 hover:bg-carman-red-1 hover:border-carman-red-1";
  if (isMore)
    delBtnMore =
      "border-carman-gray-4 hover:bg-carman-gray-4 hover:border-carman-gray-4 hover:text-white";

  const classDelBtn = `${delBtn} ${delBtnMore}`;

  return (
    <div className="w-1/4 flex justify-end">
      <div className="flex">
        <button className={classDelBtn} onClick={dec}>
          {isMore ? "-" : <FluentDeleteIcon />}
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

export default ActionCalculator;
