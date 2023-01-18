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

const GulaView = ({ gula }) => (
  <div className={`${minH} flex-1 ${!gula ? phClass : ""}`}>
    {gula && `${gula}gr`}
  </div>
);

const KaloriView = ({ kalori }) => (
  <div className={`${minH} flex-1 ${!kalori ? phClass : ""}`}>
    {kalori && `${kalori}kkal`}
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

const defClass = "flex w-full items-start mb-5";

const LayoutNutrition = ({ props, image }) => {
  const sajian = Math.ceil(props.netto / props.takaran_saji);
  return (
    <div className={`${defClass}`}>
      <Photo image={image} />
      <div className="flex-1 mr-3 w-2/3">
        <div className="font-medium">
          <Name {...props} />
        </div>
        <NutriRow>
          <div className="w-1/3">1 takaran saji</div>
          <GulaView gula={props.gula} />
          <KaloriView kalori={props.kalori} />
        </NutriRow>
        {sajian > 1 && (
          <NutriRow>
            <div className="w-1/3">
              {props.netto / props.takaran_saji} takaran saji
            </div>
            <GulaView
              gula={parseInt(props.gula * (props.netto / props.takaran_saji))}
            />
            <KaloriView
              kalori={parseInt(
                props.kalori * (props.netto / props.takaran_saji)
              )}
            />
          </NutriRow>
        )}
      </div>
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
