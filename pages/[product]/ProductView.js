import Image from "next/image";
import Container from "../../components/Layout/Container";
import { convertRupiah } from "../../helpers/util";

export const ProductSummary = ({ name, packaging, harga }) => {
  return (
    <div className="mt-8 mb-6 px-8">
      <div className="mb-4">
        <div className="text-large medium">{name}</div>
        <div className="text-medium bold text-primary flex items-center cursor-pinter">
          <label htmlFor="modal-price-info">{`Sekitar ${convertRupiah(
            harga
          )}`}</label>
          <div className="ml-2 relative">
            <div className="absolute left-0 top-0 w-full h-full bg-primary opacity-30 rounded-lg animate-ping" />
            <label
              htmlFor="modal-price-info"
              className="relative bg-white block badge badge-sm badge-primary badge-outline text-xs"
            >
              i
            </label>
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
    <div className="bg-secondary">
      <div className="relative h-auto max-h-[240px] aspect-square mx-auto">
        <Image
          width={240}
          height={240}
          src={image}
          alt={name}
          title={name}
          className="block mx-auto"
          layout="responsive"
        />
      </div>
    </div>
  );
};

const Block = ({ title, info, setPopup }) => (
  <button
    type="button"
    className="btn btn-ghost block h-auto w-[110px] bg-secondary hover:bg-secondary p-4 normal-case text-primary"
    onClick={() => setPopup({ title, info })}
  >
    <h1 className="w-full text-small bold">{title}</h1>
    <h2 className="w-full text-large regular">{info}</h2>
  </button>
);

export function ProductNutrition({ netto, gula, kalori, setPopup }) {
  return (
    <div className="flex justify-between px-6">
      <Block title="Netto" info={`${netto}ml`} setPopup={setPopup} />
      <Block title="Gula" info={`${gula}gr`} setPopup={setPopup} />
      <Block title="Kalori" info={`${kalori}kkal`} setPopup={setPopup} />
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
      <div className="h-10" />
    </Container>
  );
}
