import Button from "components/Button";
import ProductListItem from "components/Product/list-item";
import { eq } from "helpers/api";
import { removeCookie } from "helpers/util";
import ErrorLayout from "layouts/Error";
import Image from "next/image";
import PageHead from "pages/PageHead";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setCalculatedProduct } from "store/slices/calculated";
import { setPopupCalculator } from "store/slices/popupCalc";
import PopupKalkulator from "./hasil";

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

const ViewSection = ({ product, setProduct, cookie = [] }) => {
  const dispatch = useDispatch();
  const deleteAll = () => {
    removeCookie("calculated");
    dispatch(setCalculatedProduct({ product: [], total: 0 }));
    setProduct([]);
  };

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
            <Button size="small">Tambah Minuman</Button>
          </div>
        </div>
      </ErrorLayout>
    );
  return (
    <>
      <div className="flex items-center justify-between pb-3 mb-3 border border-transparent border-b-carman-gray-5">
        <div className="text-heading4">Produk Minuman</div>
        <button
          className="btn btn-xs bg-carman-red-1 rounded-full text-white border-transparent normal-case hover:bg-carman-red-1 hover:text-white hover:border-transparent"
          onClick={deleteAll}
        >
          <Image
            alt="Del"
            width={12}
            height={12}
            src="/icons/fluent_delete-12-regular.svg"
          />
          <span className="ml-1">Hapus Semua</span>
        </button>
      </div>
      {product.map((item, index) => {
        const { id } = item.data[0];
        const qty = cookie.find((i) => i.id === id).c || 1;
        const dataProduct = { ...item.data[0], qty };
        return <ProductListItem key={index} {...dataProduct} />;
      })}
    </>
  );
};

export function getServerSideProps({ req }) {
  const { cookies } = req;
  const data = cookies.calculated || "{}";
  const parsed = JSON.parse(data);
  return {
    props: {
      product: parsed.product || [],
      total: parsed.total || 0,
      calculated: parsed,
    },
  };
}

const CTACalculate = () => {
  const dispatch = useDispatch();
  const click = () => dispatch(setPopupCalculator(true));
  return (
    <div className="bg-carman-gray-10 flex justify-center p-6">
      <Button model="blue" onClick={click}>
        Hi hi hitung manismu
      </Button>
    </div>
  );
};

export default function Kalkulator({ product, total }) {
  const [isHit, setHit] = useState(false);
  const [calcProduct, setProduct] = useState(false);

  useEffect(() => {
    const run = (list) =>
      Promise.all(
        list.map(async (item) => {
          const res = await eq("minuman", { column: "id", value: item.id });
          return res;
        })
      );

    if (!isHit) setHit(true);
    else if (isHit && product) {
      const list = [...product];
      run(list).then((resPromise) => {
        setTimeout(setProduct, 2000, resPromise);
      });
    }
  }, [isHit, product]);

  return (
    <>
      <PageHead title="Kalkulator Manis" />
      <div className="container">
        <div className="content-wrapper">
          <div className="min-h-[400px] px-4 py-10">
            <HeadSection />
            <ViewSection
              cookie={product}
              product={calcProduct}
              setProduct={setProduct}
            />
          </div>
        </div>
      </div>
      {calcProduct && calcProduct.length > 0 && <CTACalculate />}
      <PopupKalkulator />
    </>
  );
}
