import Image from "next/image";

export default function ProductListItem({
  image,
  name,
  netto,
  packaging,
  qty,
  sugar,
  calorie,
}) {
  const hasInfo = netto && qty && packaging;
  const hasNutri = sugar && calorie;

  const phClass = `bg-slate-200 animate-pulse rounded-md`;

  return (
    <div className="flex w-full items-start mb-5">
      <div className="mr-3">
        {image ? (
          <Image width={72} height={72} alt={name} src={image} />
        ) : (
          <div className={`h-[72px] w-[72px] ${phClass}`} />
        )}
      </div>
      <div className="mr-3 w-2/3">
        <div
          className={`line-clamp-2 min-h-[16px] mb-2 ${!name ? phClass : ""}`}
        >
          {name}
        </div>
        <div className={`min-h-[16px] ${!hasInfo ? phClass : ""}`}>
          {hasInfo && `${netto}ml - ${packaging} - Qty: 1`}
        </div>
      </div>
      <div className="w-1/3">
        <div className={`min-h-[16px] mb-2 ${!sugar ? phClass : ""}`}>
          {sugar && `${sugar}gr`}
        </div>
        <div className={`min-h-[16px] mb-2 ${!calorie ? phClass : ""}`}>
          {calorie && `${calorie}gr`}
        </div>
      </div>
    </div>
  );
}
