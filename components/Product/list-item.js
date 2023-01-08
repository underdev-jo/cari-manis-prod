import NextImage from "next/image";
import { useEffect, useState } from "react";

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

const Action = ({ id, qty = 1 }) => {
  const [count, setCount] = useState(1);

  useEffect(() => {
    setCount(qty);
  }, [qty]);

  const inc = () => {
    if (count < 99) setCount(parseInt(count, 0) + 1);
  };
  const dec = () => {
    if (count > 1) setCount(parseInt(count, 0) - 1);
  };

  if (!id) return <div className={`w-[100px] h-6 ${phClass}`} />;

  return (
    <div className="w-1/4">
      <div className="flex">
        <button
          className="btn btn-xs btn-outline border border-carman-gray-4 rounded-r-none rounded-l hover:bg-carman-gray-4 hover:border-carman-gray-4 hover:text-white"
          onClick={dec}
        >
          -
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
  const { image } = props;

  return (
    <div className="flex w-full items-start mb-5">
      <Photo image={image} />
      <div className="flex-1 mr-3 w-2/3">
        <Info {...props} phClass={phClass} />
        <Nutrition {...props} />
      </div>
      <Action {...props} />
    </div>
  );
}
