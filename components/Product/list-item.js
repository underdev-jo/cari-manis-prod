import NextImage from "next/image";

const phClass = `bg-slate-200 animate-pulse rounded-md`;
const minH = "min-h-[16px]";

const Image = ({ name, image }) => {
  let view = <div className={`h-[72px] w-[72px] ${phClass}`} />;
  if (image) view = <NextImage width={72} height={72} alt={name} src={image} />;
  return <div className="mr-3">{view}</div>;
};

const Info = ({ name, netto, qty, packaging }) => {
  const hasInfo = netto && packaging;
  console.log({ hasInfo });

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

const Nutrition = ({ gula, kalori }) => {
  console.log({ kalori, gula });
  return (
    <div className="flex flex-1 w-[50%] items-center gap-2 text-medium font-medium mb-1 text-carman-gray-2">
      <div className={`${minH} flex-1 mb-2 ${!gula ? phClass : ""}`}>
        {gula && `${gula}gr`}
      </div>
      <div className={`${minH} flex-1 mb-2 ${!kalori ? phClass : ""}`}>
        {kalori && `${kalori}gr`}
      </div>
    </div>
  );
};

export default function ProductListItem(props) {
  const { image, name, netto, packaging, qty, sugar, calorie } = props;
  const hasNutri = sugar && calorie;

  return (
    <div className="flex w-full items-start mb-5">
      <Image image={image} />
      <div className="flex-1 mr-3 w-2/3">
        <Info {...props} phClass={phClass} />
        <Nutrition {...props} />
      </div>
      <div className="w-1/4">hehe</div>
    </div>
  );
}
