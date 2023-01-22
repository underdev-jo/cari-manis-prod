import NextImage from "next/image";
import CalorieFire from "public/icons/calorie-fire";
import SugarCube from "public/icons/SugarCube";
import { useState } from "react";
import ActionCalculator from "./action-calculator";

const phClass = `bg-slate-200 animate-pulse rounded-md`;
const minH = "min-h-[16px]";

const Photo = ({ name, image }) => {
  let view = <div className={`h-[72px] w-[72px] ${phClass}`} />;
  if (image)
    view = (
      <NextImage
        className="rounded-lg"
        width={72}
        height={72}
        alt={name}
        src={image}
      />
    );
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

const nutriClass = (color, adds = "") =>
  ` flex gap-1 items-center justify-center text-carman-gray-2 text-small font-medium rounded-full px-2 py-[2px] ${minH} ${color} ${adds}`;

const GulaView = ({ gula, plain }) => (
  <div
    className={nutriClass(
      plain ? "bg-carman-gray-7" : "bg-carman-purple-1",
      !gula ? phClass : ""
    )}
  >
    <SugarCube /> {gula && `${gula}gr`}
  </div>
);

const KaloriView = ({ kalori, plain }) => (
  <div
    className={nutriClass(
      plain ? "bg-carman-gray-7" : "bg-carman-yellow-1",
      !kalori ? phClass : ""
    )}
  >
    <CalorieFire /> {kalori && `${kalori}kkal`}
  </div>
);

const NutriRow = ({ children }) => (
  <div className="flex flex-1 w-[100%] items-center gap-2 text-medium font-medium mb-1 text-carman-gray-2">
    {children}
  </div>
);

const Nutrition = ({ gula, kalori }) => (
  <NutriRow>
    <GulaView gula={gula} />
    <KaloriView kalori={kalori} />
  </NutriRow>
);

const generateClass = (props) => {
  const defClass =
    "flex w-full items-start mb-2 p-2 border border-transparent rounded-lg";
  const isDanger = "bg-red-100";

  let fullClass = defClass;
  if (props.model === "danger") fullClass = `${defClass} ${isDanger}`;
  return fullClass;
};

const LayoutNutrition = ({ props, image }) => {
  const sajian = Math.ceil(props.netto / props.takaran_saji);
  return (
    <div className={generateClass(props)}>
      <Photo image={image} />
      <div className="flex-1 mr-3 w-2/3">
        <div className="font-medium">
          <Name {...props} />
        </div>
        <NutriRow>
          <GulaView gula={props.xSug} plain />
          <KaloriView kalori={props.xCal} plain />
        </NutriRow>
      </div>
      <div className="text-small text-carman-gray-3">x{props.qty}</div>
    </div>
  );
};

export default function ProductListItem({ model = "default", ...props }) {
  const [deleted, setDeleted] = useState(false);
  const { image } = props;

  if (deleted) return "";

  // const styleClass = danger ? "border border-red-300 bg-red-50" : "";

  let layout = {
    default: (
      <div className={generateClass({ model, ...props })}>
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
