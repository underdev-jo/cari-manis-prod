import { useEffect, useState } from "react";
import ErrorLayout from "layouts/Error";
import { get } from "helpers/api";
import ProductSearch from "layouts/ProductSearch";
import PageHead from "pages/PageHead";
import Alert from "components/Alert";
import Spinner from "components/Spinner";
import { DrinkListView } from "layouts/Product/DrinkList";
import { supabase } from "helpers/supabase";
import AddToCalculator from "pageElement/product/AddToCalculator";
import { tableMinuman } from "helpers/util";

export async function getServerSideProps(context) {
  const { query } = context;

  const { gula = 999, kemasan = "", q = "", urutkan = "", jenis = "" } = query;

  let api = get(tableMinuman);

  let queryName = [];
  if (q) queryName = `${q}`.split(/[ ,]+/);

  if (q || kemasan || gula)
    api = supabase
      .from(tableMinuman)
      .select("*")
      .or(
        queryName.length > 0
          ? `${queryName.map(
              (qitem) => `name.ilike.%${qitem}%`
            )},category.cs.${JSON.stringify(queryName)
              .replace("[", "{")
              .replace("]", "}")}`
          : `name.ilike.%${q}%`
      )
      .ilike("packaging", `%${kemasan || ""}%`)
      .lte("gula", gula || 999);

  let apiGroupType = api;
  if (jenis) apiGroupType = api.cs("category", `{${jenis}}`);

  let apiGroup = apiGroupType.order("created_at", { ascending: false });
  if (urutkan === "lowsugar") apiGroup = apiGroupType.order("gula");
  else if (urutkan === "lowcal") apiGroup = apiGroupType.order("kalori");

  const result = await apiGroup.range(0, 29);
  return { props: { query, result, propsKeyword: q } };
}

export default function SearchPage({ result, propsKeyword, query }) {
  const [loading, setLoading] = useState(true);
  const [keyword, setKeyword] = useState();
  const [error, setError] = useState(false);

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

  return (
    <>
      <PageHead title={`Cari: ${keyword || "manis"}`} />
      <div className="relative min-h-[400px]">
        <ProductSearch keyword={keyword} />
        <div className="container">
          <div className="p-2 pt-[120px]">{render}</div>
        </div>
      </div>
      <AddToCalculator product={false} />
    </>
  );
}
