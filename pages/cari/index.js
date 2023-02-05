import { useEffect, useState } from "react";
import ErrorLayout from "layouts/Error";
import ProductSearch from "layouts/ProductSearch";
import PageHead from "pages/PageHead";
import Alert from "components/Alert";
import Spinner from "components/Spinner";
import { DrinkListView } from "layouts/Product/DrinkList";
import AddToCalculator from "pageElement/product/AddToCalculator";
import { useRouter } from "next/router";
import ProductPagination from "pageElement/product/Pagination";

const maxData = 40;

export async function getServerSideProps(context) {
  const {
    gula = 999,
    kemasan = "",
    q = "",
    urutkan = "",
    jenis = "",
    page = 1,
  } = context.query;
  let baseurl = "http://localhost:3000/api/product-search";
  const params = `gula=${gula}&kemasan=${kemasan}&q=${q}&urutkan=${urutkan}&jenis=${jenis}&page=${page}`;
  const data = await (await fetch(`${baseurl}?${params}`)).json();
  return { props: { ...data } };
}

export default function SearchPage({ result, propsKeyword, query }) {
  const [loading, setLoading] = useState(true);
  const [keyword, setKeyword] = useState();
  const [error, setError] = useState(false);
  console.log("Page Cari: ", { result, propsKeyword, query });
  const { query: queryParam } = useRouter();

  const { urutkan = "" } = queryParam;

  const unitDisplay = urutkan === "lowcal" ? "calorie" : "sugar";

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

  if (typeof window === "object")
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });

  let render = <Spinner />;
  if (!loading && result.data?.length > 0)
    render = (
      <div>
        <div className="flex items-center gap-1 my-4">
          <span className="font-bold text-black">Hasil Pencarian</span>
          <span className="text-carman-gray-8">({result.count}produk)</span>
        </div>
        <DrinkListView list={result.data} unitDisplay={unitDisplay} />
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

  const amount = result && result.count ? Math.ceil(result.count / maxData) : 0;

  return (
    <>
      <PageHead title={`Cari: ${keyword || "manis"}`} />
      <div className="relative min-h-[400px]">
        <ProductSearch keyword={keyword} />
        <div className="container mb-12">
          <div className="p-2 pt-[120px] max-w-sm mx-auto">{render}</div>
          <ProductPagination amount={amount} />
        </div>
      </div>
      <AddToCalculator product={false} />
    </>
  );
}
