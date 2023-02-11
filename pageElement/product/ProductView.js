import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import InfoSymbol from "components/Action/InfoSymbol";
import Badge from "components/Daisy/Badge";
import { convertRupiah, dailyMaxCalorie, dailyMaxSugar } from "helpers/util";
import Progress from "components/Daisy/Progress";
import style from "./Product.module.scss";
import { selectorPackaging } from "helpers/drink-selector";
import { colors } from "helpers/colors";

const carman = {
  blue: colors["carman-blue-1"],
  red: colors["carman-red-1"],
};

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
        <div className="badge badge-primary badge-outline [&>svg]:w-4 [&>svg]:h-4">
          {catProduct.image}
          <div className="text-small">{catProduct.value}</div>
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

const CalorieInfo = ({ kalori, jumlah_sajian }) => {
  const [serving, setServing] = useState(1);

  const dailyCal = dailyMaxCalorie;
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

  const dailySugar = dailyMaxSugar;
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

const Block = ({ title, info, setPopup, index, active, value, max }) => {
  let color = carman.blue;
  if (index === active) color = "#ffffff";
  else if (value >= 0.5 * max) color = carman.red;
  return (
    <motion.button
      initial={{ color: carman.blue }}
      animate={{ color }}
      type="button"
      className="relative rounded-2xl h-[68px] w-1/3"
      onClick={() => setPopup(index)}
    >
      <div className="text-medium font-bold">{title}</div>
      <div className="text-large">{info}</div>
    </motion.button>
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
  const [active, setActive] = useState(0);

  const click = (e) => setActive(e);

  const sugarData = { gula, jumlah_sajian };
  const calorieData = { kalori, jumlah_sajian };
  const nettoData = { netto, takaran_saji, ...sugarData, ...calorieData };

  let nettoUnits = "ml";
  if (`${packaging}`.toLowerCase() === "sachet") nettoUnits = "gr";

  const btnLoop = [
    { title: "Netto", value: netto, info: `${netto}${nettoUnits}` },
    { title: "Gula", value: gula, info: `${gula}gr`, max: dailyMaxSugar },
    {
      title: "Kalori",
      value: kalori,
      info: `${kalori}kkal`,
      max: dailyMaxCalorie,
    },
  ];

  const posLeft = (100 / btnLoop.length) * active;

  const tabActive = btnLoop[active];
  const titleActive = tabActive.title;
  const over = tabActive.value >= tabActive.max * 0.5;

  return (
    <div className="overflow-x-hidden">
      <div className="text-medium font-medium mb-3 px-6">
        Klik kotak berikut untuk informasi lebih detail
      </div>
      <div className="bg-primary-content rounded-lg p-3">
        <div className="relative flex justify-between bg-white rounded-2xl">
          <motion.div
            animate={{
              left: `${posLeft}%`,
              background: carman[over ? "red" : "blue"],
            }}
            className="w-1/3 h-full absolute top-0 rounded-2xl bg-carman-blue-1"
          />
          {btnLoop.map((item, index) => (
            <Block
              key={item.info}
              {...item}
              setPopup={click}
              index={index}
              active={active}
            />
          ))}
        </div>
        <motion.div
          animate={{ borderColor: carman[over ? "red" : "blue"] }}
          className={style["nutrition-box"]}
        >
          {titleActive === "Gula" && <SugarInfo {...sugarData} />}
          {titleActive === "Kalori" && <CalorieInfo {...calorieData} />}
          {titleActive === "Netto" && <NettoInfo {...nettoData} />}
        </motion.div>
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
  const jmlSajian = Math.abs(product.netto / product.takaran_saji);
  const newProduct = { ...product, jumlah_sajian: jmlSajian };
  return (
    <div className="container">
      <ProductImage {...newProduct} />
      <ProductSummary {...newProduct} />
      <ProductNutrition {...newProduct} />
      <ProductInformation {...newProduct} />
      <ProductSource {...newProduct} />
      <div className="h-20" />
    </div>
  );
}
