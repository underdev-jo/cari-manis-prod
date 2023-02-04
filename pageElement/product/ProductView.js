import Image from "next/image";
import { useEffect, useState } from "react";
import InfoSymbol from "components/Action/InfoSymbol";
import Badge from "components/Daisy/Badge";
import { convertRupiah, getCookie } from "helpers/util";
import Progress from "components/Daisy/Progress";
import style from "./Product.module.scss";
import { selectorPackaging } from "helpers/drink-selector";

const NutritionBadge = ({ children, type }) => (
  <Badge type={type} className="badge-sm font-bold">
    {children}
  </Badge>
);

const Meter = ({ max, value, maxValue, type = "primary" }) => (
  <div className="relative pb-4">
    <Progress type={type} max={max} value={value} />
    {maxValue && (
      <div className="absolute bottom-0 right-0 text-xs">Maks. {maxValue}</div>
    )}
  </div>
);

const ButtonServing = ({ setServing, serving, amount = 1 }) => {
  const group = amount > 1 ? "btn-group" : "flex";
  const btnTab = "btn btn-xs btn-primary normal-case";
  return (
    <div className={`${group} mb-4 mx-auto w-full justify-center`}>
      <button
        className={`${btnTab} ${serving === 1 ? "" : "btn-outline"}`}
        onClick={() => setServing(1)}
      >
        1 takaran saji
      </button>
      {amount > 1 && (
        <button
          className={`${btnTab} ${serving === amount ? "" : "btn-outline"}`}
          onClick={() => setServing(parseInt(amount, 10))}
        >
          {amount} takaran saji
        </button>
      )}
    </div>
  );
};

export const ProductSummary = ({ name, packaging, harga }) => {
  let catProduct = { value: "", image: "" };
  if (packaging)
    catProduct = selectorPackaging.find((i) => i.key === packaging);

  return (
    <div className="mt-8 mb-6 px-8">
      <div className="mb-4">
        <div className="text-large font-medium">{name}</div>
        <div className="text-medium font-bold text-primary flex items-center cursor-pinter">
          <label
            htmlFor="modal-price-info"
            className="flex items-center cursor-pointer"
          >
            {`Sekitar ${convertRupiah(harga)}`}
            <div className="ml-2 relative">
              <InfoSymbol />
            </div>
          </label>
        </div>
      </div>
      {/* Category product label */}
      {catProduct.value && (
        <div className="badge badge-primary badge-outline">
          <Image
            alt={catProduct.value}
            src={catProduct.image}
            width={16}
            height={16}
          />{" "}
          <div className="text-small">Minuman {catProduct.value}</div>
        </div>
      )}
    </div>
  );
};

export const ProductImage = ({ image, name }) => {
  let fallback = "/legal/cari-manis-broken-large.jpg";
  return (
    <div className="bg-primary-content">
      <div className="relative h-auto max-h-[240px] aspect-square mx-auto">
        {image ? (
          <Image
            width={240}
            height={240}
            src={image}
            alt={name}
            title={name}
            className="block mx-auto"
            layout="responsive"
            onError={(e) => (e.currentTarget.src = fallback)}
            quality={75}
          />
        ) : (
          <div className="w-full h-[240px] animate-pulse bg-primary" />
        )}
      </div>
    </div>
  );
};

const Block = ({ title, info, setPopup }) => (
  <button
    type="button"
    className={style["info-cta"]}
    onClick={() => setPopup({ title, info })}
  >
    <h1 className={style.title}>{title}</h1>
    <h2 className={style.info}>{info}</h2>
  </button>
);

const CalorieInfo = ({ kalori, jumlah_sajian }) => {
  const [serving, setServing] = useState(1);

  const dailyCal = parseInt(getCookie("dailyCalLimit") || 2100, 10);
  const value = kalori * serving;
  const percent = Math.ceil((value / dailyCal) * 100);

  let type = "primary";
  if (percent >= 50) type = "error";
  else if (percent >= 20) type = "warning";

  return (
    <div className="border-primary p-2">
      <ButtonServing
        serving={serving}
        setServing={setServing}
        amount={jumlah_sajian}
      />
      <div>
        <div className="text-small">
          Bila mengonsumsi produk ini sebanyak <b>{serving} takaran saji</b>,
          setara dengan <NutritionBadge type={type}>{percent}%</NutritionBadge>{" "}
          kebutuhan kalori harian kamu
        </div>
        <Meter
          max={dailyCal}
          value={value}
          maxValue={`${dailyCal}kkal`}
          type={type}
        />
      </div>
    </div>
  );
};

const SugarInfo = ({ gula, netto, jumlah_sajian }) => {
  const [serving, setServing] = useState(1);

  const dailySugar = parseInt(getCookie("dailySugarLimit") || 50, 10);
  const value = gula * serving;
  const percent = (value / dailySugar) * 100;

  let type = "primary";
  if (percent >= 50) type = "error";

  return (
    <div className="p-2">
      <ButtonServing
        setServing={setServing}
        serving={serving}
        amount={jumlah_sajian}
      />
      <div className="mb-2">
        <div className="text-small">
          Bila mengonsumsi produk ini sebanyak <b>{serving} takaran saji</b>,
          setara dengan <NutritionBadge type={type}>{percent}%</NutritionBadge>{" "}
          kebutuhan gula harian.
        </div>
        <Meter
          max={dailySugar}
          value={value}
          maxValue={`${dailySugar}gr`}
          type={type}
        />
      </div>
    </div>
  );
};

const NettoInfo = ({ gula, kalori, jumlah_sajian, takaran_saji }) => {
  let tips = "Kamu bisa langsung menghabiskan produk ini";
  if (jumlah_sajian > 1)
    tips = `Disarankan hanya mengonsumsi 1 takaran saji (${takaran_saji}ml) per hari.`;

  const badgeType = jumlah_sajian > 1 ? "warning" : "primary";

  const RowNutrition = ({ sajian = 1 }) => (
    <tr>
      <td className="p-2 border text-center">{sajian}</td>
      <td className="p-2 border text-center">{gula * sajian}gr</td>
      <td className="p-2 border text-center">{kalori * sajian}kkal</td>
    </tr>
  );

  return (
    <div className="p-2">
      <div>
        <div className="text-small mb-4">
          Produk ini memiliki{" "}
          <NutritionBadge type={badgeType}>{jumlah_sajian}</NutritionBadge>{" "}
          jumlah sajian.
          <br />
          {tips}
        </div>
        <table className="table-fixed w-full border border-collapse border-carman-gray-9 text-small">
          <thead>
            <tr>
              <td className="p-2 border font-medium text-center">
                Takaran Saji
              </td>
              <td className="p-2 border font-medium text-center">Kadar gula</td>
              <td className="p-2 border font-medium text-center">
                Jumlah Kalori
              </td>
            </tr>
          </thead>
          <tbody>
            <RowNutrition sajian={1} />
            {jumlah_sajian > 1 && <RowNutrition sajian={jumlah_sajian} />}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export function ProductNutrition({
  netto,
  jumlah_sajian,
  takaran_saji,
  gula,
  kalori,
  packaging,
}) {
  const [info, setInfo] = useState(false);

  const click = (e) => {
    if (info === e.title) setInfo(false);
    else setInfo(e.title);
  };

  const sugarData = { gula, jumlah_sajian };
  const calorieData = { kalori, jumlah_sajian };
  const nettoData = { netto, takaran_saji, ...sugarData, ...calorieData };

  let nettoUnits = "ml";
  if (`${packaging}`.toLowerCase() === "sachet") nettoUnits = "gr";

  return (
    <div>
      <div className="text-medium font-medium mb-3 px-6">
        Klik kotak berikut untuk informasi lebih detail
      </div>
      <div className="flex justify-between px-6">
        <Block title="Netto" info={`${netto}${nettoUnits}`} setPopup={click} />
        <Block title="Gula" info={`${gula}gr`} setPopup={click} />
        <Block title="Kalori" info={`${kalori}kkal`} setPopup={click} />
      </div>
      <div className={`${style["nutrition-box"]} ${info ? style.open : ""}`}>
        {info === "Gula" && <SugarInfo {...sugarData} />}
        {info === "Kalori" && <CalorieInfo {...calorieData} />}
        {info === "Netto" && <NettoInfo {...nettoData} />}
      </div>
    </div>
  );
}

export function ProductInformation({
  netto,
  kalori,
  gula,
  takaran_saji,
  jumlah_sajian,
  total_gula,
}) {
  const Row = ({ name, value }) => (
    <div className={style["nutrition-row"]}>
      <div>{name}</div>
      <div className={style.value}>{value}</div>
    </div>
  );

  return (
    <div className={style["nutrition-table"]}>
      <h3 className="text-heading4 mb-4">Informasi kandungan minuman</h3>
      <div>
        <Row name="Netto" value={`${netto}ml`} />
        <Row name="Kandungan Gula" value={`${gula}gr`} />
        <Row name="Takaran Saji" value={`${takaran_saji}ml`} />
        <Row name="Kalori" value={`${kalori}ml`} />
        <Row name="Jumlah Sajian" value={jumlah_sajian} />
        <Row name="Total kandungan gula" value={`${total_gula}ml`} />
      </div>
    </div>
  );
}

export function ProductSource({ source }) {
  return (
    <div className="my-6 px-6">
      <h3 className="text-heading4">Sumber informasi</h3>
      <div className="text-small">{source}</div>
    </div>
  );
}

export default function ProductView({ product }) {
  return (
    <div className="container">
      <ProductImage {...product} />
      <ProductSummary {...product} />
      <ProductNutrition {...product} />
      <ProductInformation {...product} />
      <ProductSource {...product} />
      <div className="h-20" />
    </div>
  );
}
