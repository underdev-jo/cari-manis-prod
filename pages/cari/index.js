import { useEffect, useState } from "react";
import ErrorLayout from "layouts/Error";
import { get } from "helpers/api";
import ProductSearch from "layouts/ProductSearch";
import PageHead from "pages/PageHead";
import Alert from "components/Alert";
import Spinner from "components/Spinner";
import { DrinkListView } from "layouts/Product/DrinkList";
import { supabase } from "helpers/supabase";

export async function getServerSideProps(context) {
  const { query } = context;

  const { gula = 999, kemasan = "", q = "" } = query;

  let api = get("minuman");

  let queryName = [];
  if (q) queryName = `${q}`.split(/[ ,]+/);

  if (q || kemasan || gula)
    api = supabase
      .from("minuman")
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
      .lte("gula", gula || 999)
      .range(0, 19)
      .order("created_at", { ascending: false });

  const result = await api;
  // console.log({ queryName, q, result });
  return { props: { query, result, propsKeyword: q } };
}

export default function SearchPage({ result, propsKeyword }) {
  const [loading, setLoading] = useState(true);
  const [keyword, setKeyword] = useState();
  const [error, setError] = useState(false);

  useEffect(() => {
    setKeyword(propsKeyword);
  }, [propsKeyword]);

  useEffect(() => {
    if (Object.keys(result).length > 0) {
      setLoading(false);

      if (result && result.error) setError(result.error);
    }
    // if (result && result?.data?.length > 0) setLoading(false);
  }, [result]);

  let render = <Spinner />;
  if (!loading && result.data?.length > 0)
    render = <DrinkListView list={result.data} />;
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
          <div className="p-2">{render}</div>
        </div>
      </div>
    </>
  );
}
