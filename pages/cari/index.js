import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ErrorLayout from "layouts/Error";
import ProductSearch from "layouts/ProductSearch";
import PageHead from "pages/PageHead";
import Alert from "components/Alert";
import Spinner from "components/Spinner";
import { DrinkListView } from "layouts/Product/DrinkList";
import AddToCalculator from "pageElement/product/AddToCalculator";
import { useRouter } from "next/router";
import ProductPagination from "pageElement/product/Pagination";
import { baseUrl, maxFetchData } from "helpers/util";

const maxData = maxFetchData;

export async function getServerSideProps(context) {
  const {
    gula = 999,
    kemasan = "",
    q = "",
    urutkan = "",
    jenis = "",
    page = 1,
  } = context.query;
  const params = new URLSearchParams({
    q,
    gula,
    kemasan,
    urutkan,
    jenis,
    page,
  }).toString();
  const apiUrl = `${baseUrl}/api/product-search?${params}`;

  const data = await (await fetch(apiUrl)).json();
  return { props: { ...data } };
}

export default function SearchPage({
  result,
  propsKeyword,
  query,
  classes = "",
}) {
  const [loading, setLoading] = useState(true);
  const [keyword, setKeyword] = useState();
  const [error, setError] = useState(false);

  const { query: queryParam } = useRouter();

  const { urutkan = "", filter = "" } = queryParam;

  const qUrutkan = urutkan.includes("cal");
  const qFilter = filter.includes("kalori");
  const logic = qUrutkan || qFilter;
  const unitDisplay = logic ? "calorie" : "sugar";

  const amount = result && result.count ? Math.ceil(result.count / maxData) : 0;

  useEffect(() => {
    const nextQuery = (query && query.q) || propsKeyword;
    setKeyword(nextQuery);
  }, [query, propsKeyword]);

  useEffect(() => {
    if (result && Object.keys(result).length > 0) {
      setLoading(false);
      if (result && result.error) {
        let err = "Terjadi kesalahan pada saat melakukan permintaan data";
        if (process.env.enviroment === "local") err = result.error;
        setError(err);
      }
    }
  }, [result]);

  // if (typeof window === "object")
  //   window.scrollTo({ top: 0, left: 0, behavior: "smooth" });

  let render = <Spinner />;
  if (!loading && result.data?.length > 0)
    render = (
      <div>
        <div className="flex items-center gap-1 my-4">
          <span className="font-bold text-black">Hasil Pencarian</span>
          <span className="text-carman-gray-8">({result.count}produk)</span>
        </div>
        <ProductPagination amount={amount} />
        <DrinkListView list={result.data} unitDisplay={unitDisplay} />
        <ProductPagination amount={amount} />
      </div>
    );
  else if (
    (!loading && (result.data?.length < 1 || result.length < 1)) ||
    error
  )
    render = (
      <ErrorLayout
        title="Yah, yang kamu cari gaada :("
        imagePath="/faces/sad-face.svg"
      >
        <div>
          {error
            ? error.message
            : "Coba cari produk manis lain kayak kopi, susu, yogurt atau yang lain deh. Atau cobain cari berdasarkan kemasan minuman manis favorit gimana?"}
        </div>
      </ErrorLayout>
    );
  else if (!loading && result.error)
    render = <Alert type="error" message={result.error?.message || "Error!"} />;

  return (
    <>
      <PageHead title={`Cari${keyword ? `: ${keyword}` : "Manis"}`} />
      <motion.div
        animate={{
          translateY: ["10%", "0%"],
        }}
      >
        <div className={`relative min-h-[400px] ${classes}`}>
          <div className="container mb-12">
            <div className={`pt-[120px] p-2 max-w-sm mx-auto`}>{render}</div>
          </div>
        </div>
      </motion.div>

      <ProductSearch keyword={keyword} />
      <AddToCalculator product={false} />
    </>
  );
}
