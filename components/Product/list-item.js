import NextImage from "next/image";
import { useState } from "react";
import ActionCalculator from "./action-calculator";

const phClass = `bg-slate-200 animate-pulse rounded-md`;
const minH = "min-h-[16px]";

const Photo = ({ name, image }) => {
  let view = <div className={`h-[72px] w-[72px] ${phClass}`} />;
  if (image) view = <NextImage width={72} height={72} alt={name} src={image} />;
  return <div className="mr-3">{view}</div>;
};

const Name = ({ name }) => {
  const nameLoading = `${minH} ${!name ? phClass : ""}`;
  const nameClass = `line-clamp-2 mb-1 text-medium ${nameLoading}`;
  return <div className={nameClass}>{name}</div>;
};

const Info = ({ netto, packaging }) => {
  const hasInfo = netto && packaging;

  const infoLoading = `${minH} ${!hasInfo ? phClass : ""}`;
  const infoClass = `text-small mb-1 text-carman-gray-3 ${infoLoading}`;

  return (
    <div className={infoClass}>{hasInfo && `${netto}ml - ${packaging}`}</div>
  );
};

// const GulaView = ({ gula }) => (
//   <div className={`${minH} flex-1 mb-2 ${!gula ? phClass : ""}`}>
//     {gula && `${gula}gr`}
//   </div>
// );

// const KaloriView = ({ kalori }) => (
//   <div className={`${minH} flex-1 mb-2 ${!kalori ? phClass : ""}`}>
//     {kalori && `${kalori}kkal`}
//   </div>
// );

const Nutrition = ({ gula, kalori }) => (
  <div className="flex flex-1 w-[50%] items-center gap-2 text-medium font-medium mb-1 text-carman-gray-2">
    <div className={`${minH} flex-1 mb-2 ${!gula ? phClass : ""}`}>
      {gula && `${gula}gr`}
    </div>
    <div className={`${minH} flex-1 mb-2 ${!kalori ? phClass : ""}`}>
      {kalori && `${kalori}kkal`}
    </div>
  </div>
);

const defClass = "flex w-full items-start mb-5";

const LayoutNutrition = ({ props, image }) => (
  <div className={`${defClass}`}>
    <Photo image={image} />
    <div className="flex-1 mr-3 w-2/3">
      <div className="font-medium">
        <Name {...props} />
        <Info {...props} />
      </div>
      <Nutrition {...props} />
    </div>
  </div>
);

export default function ProductListItem({ model = "default", ...props }) {
  const [deleted, setDeleted] = useState(false);
  const { image } = props;

  if (deleted) return "";

  // const styleClass = danger ? "border border-red-300 bg-red-50" : "";

  let layout = {
    default: (
      <div className={defClass}>
        <Photo image={image} />
        <div className="flex-1 mr-3 w-2/3">
          <div className="font-medium">
            <Name {...props} />
            <Info {...props} />
          </div>
          <Nutrition {...props} />
        </div>
        <ActionCalculator setDeleted={setDeleted} {...props} />
      </div>
    ),
    nutrition: <LayoutNutrition props={props} image={image} />,
  };

  let view = layout[`${model}`];
  if (!view) view = layout["default"];

  return view;
}
