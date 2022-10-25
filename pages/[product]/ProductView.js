import Image from "next/image";
import { useEffect, useState } from "react";
import InfoSymbol from "../../components/Action/InfoSymbol";
import Container from "../../components/Layout/Container";
import { badge, progress } from "../../helpers/daisyHelper";
import { convertRupiah, daisyTail, getCookie } from "../../helpers/util";

const Badge = ({ children, type = "primary" }) => (
  <div className={`${badge(type)} font-bold`}>{children}</div>
);

const Meter = ({ max, value, maxValue, type = "primary" }) => (
  <div className="relative pb-4">
    <progress className={progress(type)} max={max} value={value} />
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
      <buton
        className={`${btnTab} ${serving === 1 ? "" : "btn-outline"}`}
        onClick={() => setServing(1)}
      >
        1 takaran saji
      </buton>
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
  return (
    <div className="mt-8 mb-6 px-8">
      <div className="mb-4">
        <div className="text-large medium">{name}</div>
        <div className="text-medium bold text-primary flex items-center cursor-pinter">
          <label htmlFor="modal-price-info">{`Sekitar ${convertRupiah(
            harga
          )}`}</label>
          <div className="ml-2">
            <InfoSymbol />
          </div>
        </div>
      </div>
      <div>
        <div className="mb-1 text-small">
          <span className="font-medium">Jenis minuman:</span>{" "}
        </div>
        <div className="text-small">
          <span className="font-medium">Kemasan:</span> {packaging}
        </div>
      </div>
    </div>
  );
};

export const ProductImage = ({ image, name }) => {
  return (
    <div className="bg-primary-content">
      <div className="relative h-auto max-h-[240px] aspect-square mx-auto">
        <Image
          width={240}
          height={240}
          src={image}
          alt={name}
          title={name}
          className="block mx-auto"
          layout="responsive"
          priority
        />
      </div>
    </div>
  );
};

const Block = ({ title, info, setPopup }) => (
  <button
    type="button"
    className="btn btn-ghost block h-auto w-[110px] bg-primary-content p-4 normal-case text-primary"
    onClick={() => setPopup({ title, info })}
  >
    <h1 className="w-full text-small bold">{title}</h1>
    <h2 className="w-full text-large regular">{info}</h2>
  </button>
);

const CalorieInfo = ({ kalori, jumlah_sajian }) => {
  const [serving, setServing] = useState(1);

  const dailyCal = parseInt(getCookie("dailyCalLimit") || 2100, 10);
  const value = kalori * serving;
  const percent = Math.ceil((value / dailyCal) * 100);

  let type = "primary";
  if (percent >= 50) type = "error";

  return (
    <div className="border-primary p-2">
      <ButtonServing
        serving={serving}
        setServing={setServing}
        amount={jumlah_sajian}
      />
      <div>
        <div className="text-sm">
          Bila mengonsumsi produk ini sebanyak <b>{serving} takaran saji</b>,
          setara dengan <Badge>{percent}%</Badge> kebutuhan kalori harian kamu
        </div>
        <Meter max={dailyCal} value={value} maxValue={`${dailyCal}kkal`} />
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
        <div className="text-sm">
          Bila mengonsumsi produk ini sebanyak <b>{serving} takaran saji</b>,
          setara dengan <Badge type={type}>{percent}%</Badge> kebutuhan gula
          harian.
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
    tips = `Disarankan hanya mengonsumsi ${takaran_saji}ml.`;

  const RowNutrition = ({ sajian = 1 }) => (
    <tr>
      <td className="p-2 border">{sajian}</td>
      <td className="p-2 border">
        <table className="w-full">
          <tr>
            <td>{gula * sajian}gr</td>
            <td>gula</td>
          </tr>
          <tr>
            <td>{kalori * sajian}kkal</td>
            <td>kalori</td>
          </tr>
        </table>
      </td>
    </tr>
  );

  return (
    <div className="p-2">
      <div>
        <div className="text-sm mb-4">
          Produk ini memiliki{" "}
          <Badge type={jumlah_sajian > 1 ? "warning" : "primary"}>
            {jumlah_sajian}
          </Badge>{" "}
          jumlah sajian.
          <br />
          {tips}
        </div>
        <table className="table-fixed w-full border border-collapse border-[#E2E8F4] text-sm">
          <tr>
            <td className="p-2 border font-medium">Takaran Saji</td>
            <td className="p-2 border font-medium">Kadar nutrisi</td>
          </tr>
          <RowNutrition sajian={1} />
          {jumlah_sajian > 1 && <RowNutrition sajian={jumlah_sajian} />}
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
  setPopup,
}) {
  const [info, setInfo] = useState(false);

  useEffect(() => {
    console.log("Effect: ", info);
  }, [info]);

  const click = (e) => {
    console.log("Click: ", info, e);
    if (info === e.title) setInfo(false);
    else setInfo(e.title);
    setPopup(e);
  };

  const sugarData = { gula, jumlah_sajian };
  const calorieData = { kalori, jumlah_sajian };
  const nettoData = { netto, takaran_saji, ...sugarData, ...calorieData };

  return (
    <div>
      <div className="flex justify-between px-6">
        <Block title="Netto" info={`${netto}ml`} setPopup={click} />
        <Block title="Gula" info={`${gula}gr`} setPopup={click} />
        <Block title="Kalori" info={`${kalori}kkal`} setPopup={click} />
      </div>
      <div
        className={`bg-base-100 border mx-6 px-4 rounded-lg my-4 overflow-y-hidden ${
          info ? "h-50 py-4 border-primary" : "h-0 py-0 border-transparent"
        }`}
        style={{ transition: "0.15s ease-in-out" }}
      >
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
  const colClass = "text-small p-2.5 border border-[#E2E8F4]";
  const valClass = "text-right text-small bold";
  return (
    <div className="my-10 px-6">
      <h3 className="cm-heading h4 mb-4">Informasi kandungan minuman</h3>
      <table className="table-fixed w-full border border-collapse border-[#E2E8F4]">
        <tbody>
          <tr>
            <td className={colClass}>Netto</td>
            <td className={`${colClass} ${valClass}`}>{netto}ml</td>
          </tr>
          <tr>
            <td className={colClass}>Kandungan Gula</td>
            <td className={`${colClass} ${valClass}`}>{gula}gr</td>
          </tr>
          <tr>
            <td className={colClass}>Takaran Saji</td>
            <td className={`${colClass} ${valClass}`}>{takaran_saji}ml</td>
          </tr>
          <tr>
            <td className={colClass}>Kalori</td>
            <td className={`${colClass} ${valClass}`}>{kalori}kkal</td>
          </tr>
          <tr>
            <td className={colClass}>Jumlah Sajian</td>
            <td className={`${colClass} ${valClass}`}>{jumlah_sajian}</td>
          </tr>
          <tr>
            <td className={colClass}>Total Kandungan Gula</td>
            <td className={`${colClass} ${valClass}`}>{total_gula}gr</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export function ProductSource({ source }) {
  return (
    <div className="my-6 px-6">
      <h3 className="cm-heading h4">Sumber informasi</h3>
      <div className="text-sm">{source}</div>
    </div>
  );
}

export default function ProductView({ product, setPopup }) {
  return (
    <Container>
      <ProductImage {...product} />
      <ProductSummary {...product} />
      <ProductNutrition {...product} setPopup={setPopup} />
      <ProductInformation {...product} />
      <ProductSource {...product} />
      <div className="h-20" />
    </Container>
  );
}
