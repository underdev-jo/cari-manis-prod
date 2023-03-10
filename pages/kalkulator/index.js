import Button from "components/Button";
import ProductListItem from "components/Product/list-item";
import { supabase } from "helpers/supabase";
import { baseUrl, getCookie, removeCookie } from "helpers/util";
import ErrorLayout from "layouts/Error";
import { useRouter } from "next/router";
import PageHead from "pages/PageHead";
import CalorieFire from "public/icons/calorie-fire";
import FluentDeleteIcon from "public/icons/FluentDeleteIcon";
import IconPlus from "public/icons/icon-plus";
import SugarCube from "public/icons/SugarCube";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCalculatedProduct } from "store/slices/calculated";
import { setPopupCalculator } from "store/slices/calculatedPopup";
import { setProductCalc } from "store/slices/calculatedProduct";
import PopupHasil from "./hasil-popup";

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

const ViewSection = ({ product, cookie = [] }) => {
  const { push } = useRouter();
  const dispatch = useDispatch();

  const deleteAll = () => {
    removeCookie("calculated");
    dispatch(setCalculatedProduct({ product: [], total: 0 }));
    dispatch(setProductCalc([]));
  };

  const openPop = () => {
    // dispatch(setPopupAdd(true));
    // document.body.style.overflow = "hidden";
    push("/kalkulator/tambah");
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
            <Button size="small" onClick={openPop}>
              Tambah Minuman
            </Button>
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
          <FluentDeleteIcon />
          <span className="ml-1">Hapus Semua</span>
        </button>
      </div>
      {product.map((item, index) => {
        return (
          <ProductListItem
            model={item.data[0].xSug > 20 ? "danger" : ""}
            key={index}
            {...item.data[0]}
          />
        );
      })}
      <div className="flex justify-end">
        <Button onClick={openPop} className="!rounded-2xl !btn-sm">
          <div className="flex items-center justify-between gap-1">
            <IconPlus />
            <span>Tambah Minuman</span>
          </div>
        </Button>
      </div>
    </>
  );
};

const CTACalculate = () => {
  const dispatch = useDispatch();
  const click = (value = true) => dispatch(setPopupCalculator(value));
  const clickCal = () => click("calorie");
  const clickSugar = () => click("sugar");
  return (
    <div className="bg-carman-gray-10 flex justify-center p-6 gap-4">
      <Button onClick={clickCal} className="gap-2 text-white">
        <CalorieFire />
        Hitung Kalori
      </Button>
      <Button model="blue" onClick={clickSugar} className="gap-2 text-white">
        <SugarCube size={20} />
        Hitung Gula
      </Button>
    </div>
  );
};

export async function getServerSideProps({ req, query }) {
  const { cookies } = req;
  const data = cookies.calculated || "{}";
  const parsed = JSON.parse(data);

  let list = parsed.product ? [...parsed.product] : [];

  const items = [];

  const runList = () =>
    Promise.all(
      list.map(async (item) => {
        let url = `${baseUrl}/api/product-detail`;
        const res = await fetch(`${url}?id=${item.id}`, { method: "GET" });
        const datares = res.json();
        return datares;
      })
    );

  const propsing = (resItem) => {
    let returnItem = resItem;
    const item = resItem.data[0];
    items.push({ id: item.id, kal: item.kalori, gul: item.gula });
    const target = list.find((i) => i.id === item.id);
    const count = target.c;
    const newProps = {
      qty: count,
      xSug: count * item.gula,
      xCal: count * item.kalori,
    };
    const newItem = { ...item, ...newProps };
    if (item) returnItem = { ...resItem, data: [newItem] };
    return returnItem;
  };

  const env = process.env.environment;
  const envProd = env === "production";
  const analyticTable = `anal_kalkulator_${envProd ? "production" : "staging"}`;
  const uid = cookies.uid;

  const productsCalc = await runList()
    .then((res) => res)
    .then((item) => item.map((i) => propsing(i)))
    .then(async (itemprops) => {
      await supabase
        .from(analyticTable)
        .insert({ uid, product: JSON.stringify(items) });
      return itemprops;
    });

  return { props: { product: list, productsCalc } };
}

export default function Kalkulator({ product, productsCalc }) {
  const calcProduct = useSelector(
    ({ calculatedProduct }) => calculatedProduct.product
  );

  const dispatch = useDispatch();
  const setProduct = (value) => dispatch(setProductCalc(value));

  useEffect(() => {
    if (productsCalc) dispatch(setProductCalc(productsCalc));
  }, [productsCalc, dispatch]);

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
      <PopupHasil />
    </>
  );
}
