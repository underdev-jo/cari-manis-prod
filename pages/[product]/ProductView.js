import Image from "next/image";
import Container from "../../components/Layout/Container";
import { convertRupiah } from "../../helpers/util";

export const ProductSummary = ({ name, packaging, harga }) => {
  return (
    <div className="mt-8 mb-6 px-8">
      <div className="mb-4">
        <div className="text-large medium">{name}</div>
        <div className="text-medium bold text-primary">{`Sekitar ${convertRupiah(
          harga
        )}`}</div>
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

export function ProductNutrition({ netto, gula, kalori }) {
  const Block = ({ title, info }) => (
    <div className="btn btn-ghost h-auto w-[110px] bg-secondary hover:bg-secondary p-4 normal-case text-primary">
      <div className="w-full text-small bold">{title}</div>
      <div className="w-full text-large regular">{info}</div>
    </div>
  );

  return (
    <div className="flex justify-between px-6">
      <Block title="Netto" info={`${netto}ml`} />
      <Block title="Gula" info={`${gula}gr`} />
      <Block title="Kalori" info={`${kalori}kkal`} />
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
      <div className="cm-heading h4 mb-4">Informasi kandungan minuman</div>
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

export default function ProductView({ product }) {
  return (
    <Container>
      <ProductImage {...product} />
      <ProductSummary {...product} />
      <ProductNutrition {...product} />
      <ProductInformation {...product} />
    </Container>
  );
}
