import Button from "components/Button";
import ProductListItem from "components/Product/list-item";
import { eq } from "helpers/api";
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

// export function getServerSideProps({ req }) {
//   const calculated = req.cookies.calculated || {};
//   const parsed = JSON.parse(calculated);
//   console.log("ssr: ", parsed);
//   console.log("----------------------------------------");
//   return {
//     props: {
//       calculated: req.cookies.calculated || "",
//     },
//   };
// }

export default function Kalkulator(props) {
  const [isHit, setHit] = useState(false);

  const reducer = useSelector(({ calculated }) => calculated.product);

  useEffect(() => {
    const run = async (productList) => {
      setHit(true);
      return Promise.all(
        productList.map(async (item) => {
          const res = await eq("minuman", { column: "id", value: item.id });
          return res;
        })
      );
    };

    if (reducer.product && !isHit) {
      const productList = [...reducer.product];

      if (productList.length && !isHit) {
        run(productList).then((resPromise) => {
          console.log("Async done: ", resPromise);
        });
      }
    }
  }, [reducer.product, isHit]);

  return (
    <>
      <PageHead title="Kalkulator Manis" />
      <div className="container">
        <div className="content-wrapper">
          <div className="min-h-[400px] px-4 py-10">
            <HeadSection />
            <ViewSection product={false} />
          </div>
        </div>
      </div>
    </>
  );
}
