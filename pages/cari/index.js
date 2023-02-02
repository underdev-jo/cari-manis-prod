import { useEffect, useState } from "react";
import ErrorLayout from "layouts/Error";
import ProductSearch from "layouts/ProductSearch";
import PageHead from "pages/PageHead";
import Alert from "components/Alert";
import Spinner from "components/Spinner";
import { DrinkListView } from "layouts/Product/DrinkList";
import { supabase } from "helpers/supabase";
import AddToCalculator from "pageElement/product/AddToCalculator";
import { arrStringObj, slugify, tableMinuman } from "helpers/util";
import { useRouter } from "next/router";

const maxData = 40;

export async function getServerSideProps(context) {
  const { query } = context;

  const {
    gula = 999,
    kemasan = "",
    q = "",
    urutkan = "",
    jenis = "",
    page = 1,
  } = query;

  let api = supabase.from(tableMinuman).select("*", { count: "exact" });

  let queryName = [];
  if (q) queryName = `${q}`.split(/[ ,]+/);

  if (q || kemasan || gula) {
    let orName = `name.ilike.%${q}%`;
    if (queryName.length > 0)
      orName = queryName.map((qitem) => `name.ilike.%${qitem}%`);

    const orCat = `category.cs.${arrStringObj(queryName)}`;

    api = supabase
      .from(tableMinuman)
      .select("*", { count: "exact" })
      .or(`${orName},${orCat},kategori.ilike.%${jenis}%`)
      .ilike("packaging", `%${kemasan || ""}%`)
      .lte("gula", gula || 999);
  }

  let apiGroupType = api;
  if (jenis) apiGroupType = api.contains("category", `{${jenis}}`);

  let apiGroup = apiGroupType.order("created_at", { ascending: false });
  if (urutkan === "lowsugar") apiGroup = apiGroupType.order("gula");
  else if (urutkan === "lowcal") apiGroup = apiGroupType.order("kalori");

  const startLen = (page - 1) * maxData;
  const maxLen = startLen + maxData;
  console.log("Fetch start: ", { start: startLen, max: maxData });

  const result = await apiGroup.range(startLen, maxLen);
  return { props: { query, result, propsKeyword: q, page } };
}

export default function SearchPage({ result, propsKeyword, query, page }) {
  const [loading, setLoading] = useState(true);
  const [keyword, setKeyword] = useState();
  const [error, setError] = useState(false);

  const { replace, query: queryParam } = useRouter();

  const { urutkan = "" } = query;

  const unitDisplay = urutkan === "lowcal" ? "calorie" : "sugar";

  useEffect(() => {
    const nextQuery = query.q || propsKeyword;
    setKeyword(nextQuery);
  }, [query, propsKeyword]);

  useEffect(() => {
    if (Object.keys(result).length > 0) {
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
    render = <DrinkListView list={result.data} unitDisplay={unitDisplay} />;
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

  const nums = Math.ceil(result.count / maxData);
  const arrPaging = Array.from({ length: nums }, (_, i) => i + 1);

  const replaceParams = (value) => {
    const pageParams = slugify(value || "");
    let newQuery = { ...queryParam, page: pageParams };
    const params = new URLSearchParams(newQuery).toString();
    replace(`/cari?${params}`);
  };

  return (
    <>
      <PageHead title={`Cari: ${keyword || "manis"}`} />
      <div className="relative min-h-[400px]">
        <ProductSearch keyword={keyword} />
        <div className="container">
          <div className="p-2 pt-[120px] max-w-sm mx-auto">{render}</div>
          {nums > 1 ? (
            <div className="mt-4 mb-8">
              Kamu aktif pada pencarian ke:
              <div>
                {arrPaging.map((i) => (
                  <button
                    key={i}
                    className={`btn btn-outline btn-sm btn-ghost m-1 btn-square ${
                      parseInt(page) === i ? "btn-disabled" : ""
                    }`}
                    onClick={() => (page !== i ? replaceParams(i) : undefined)}
                  >
                    {i}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      <AddToCalculator product={false} />
    </>
  );
}
