import Button from "components/Button";
import ErrorLayout from "layouts/Error";
import Image from "next/image";
import PageHead from "pages/PageHead";
import { useEffect, useState } from "react";

export async function getServerSideProps(context) {
  const {
    req: { cookies },
  } = context;
  return { props: { cookies } };
}

const HeadSection = () => (
  <div className="mb-8">
    <h2 className="text-heading3">Kalkulator Manis</h2>
    <h3 className="text-medium font-normal">
      Hitung kandungan gula dan kalori dari minuman yang kamu konsumsi
    </h3>
  </div>
);

const CalculatedItem = ({
  image,
  name,
  netto,
  packaging,
  qty,
  sugar,
  calorie,
}) => {
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
};

const Placeholder = () => (
  <div>
    <div className="h-8 mb-3 animate-pulse bg-slate-200 rounded-md" />
    <CalculatedItem />
    <CalculatedItem />
  </div>
);

const ViewSection = ({ product }) => {
  if (!product) return <Placeholder />;
  else if (product.length < 1)
    return (
      <ErrorLayout title="Minuman kamu kosong...">
        <div>
          <div className="text-medium font-normal mb-2">
            Kamu belum menambahkan minuman pada kalkulator manis. Tambahkan
            minuman pilihanmu agar kami bisa bantu hitung manismu
          </div>
          <div className="flex justify-center pt-2">
            <Button>Tambah Minuman</Button>
          </div>
        </div>
      </ErrorLayout>
    );
  return product.map((item) => <CalculatedItem key={item.id} {...item} />);
};

export default function Kalkulator({ cookies = {} }) {
  const [product, setProduct] = useState(false);

  console.log("Kalkulator: ", cookies);

  const { calculated = "" } = cookies;

  console.log({ calculated });

  useEffect(() => {
    let res = [];
    if (calculated) {
    }
    setTimeout(setProduct, 3000, []);
  }, [calculated]);

  return (
    <>
      <PageHead title="Kalkulator Manis" />
      <div className="container">
        <div className="content-wrapper">
          <div className="min-h-[400px] px-4 py-10">
            <HeadSection />
            <ViewSection product={product} />
          </div>
        </div>
      </div>
    </>
  );
}
