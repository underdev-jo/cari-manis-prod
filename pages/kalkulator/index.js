import Button from "components/Button";
import ProductListItem from "components/Product/list-item";
import ErrorLayout from "layouts/Error";
import PageHead from "pages/PageHead";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const HeadSection = () => (
  <div className="mb-8">
    <h2 className="text-heading3">Kalkulator Manis</h2>
    <h3 className="text-medium font-normal">
      Hitung kandungan gula dan kalori dari minuman yang kamu konsumsi
    </h3>
  </div>
);

const Placeholder = () => (
  <div>
    <div className="h-8 mb-3 animate-pulse bg-slate-200 rounded-md" />
    <ProductListItem />
    <ProductListItem />
    <ProductListItem />
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
  return product.map((item, index) => (
    <ProductListItem key={index} {...item} />
  ));
};

export default function Kalkulator() {
  const [product, setProduct] = useState(false);

  const reducer = useSelector(({ calculated }) => calculated.product);

  useEffect(() => {
    if (reducer && reducer.length) {
      const unique = Array.from(new Set(reducer.map((item) => item.id))).map(
        (id) => reducer.find((a) => a.id === id)
      );
      console.log({ unique });
      setProduct(unique);
    }
  }, [reducer]);

  console.log({ product });

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
