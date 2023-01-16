import { useEffect, useState } from "react";
import ErrorLayout from "layouts/Error";
import { get } from "helpers/api";
import ProductSearch from "layouts/ProductSearch";
import PageHead from "pages/PageHead";
import Alert from "components/Alert";
import Spinner from "components/Spinner";
import { DrinkListView } from "layouts/Product/DrinkList";
import { createClient } from "@supabase/supabase-js";
import { supaKey, supaUrl } from "helpers/util";

export async function getStaticProps(context) {
  const {
    query: { gula = 999, kemasan = "", q = "" },
  } = context;

  // const gula = (query && query.gula) || 999;
  // const kemasan = (query && query.kemasasn) || "";
  // const q = (query && query.q) || "";

  let api = get("minuman");

  const clientAPI = createClient(supaUrl(), supaKey());
  if (q || kemasan || gula)
    api = clientAPI
      .from("minuman")
      .select("*")
      .ilike("name", `%${q}%`)
      .ilike("packaging", `%${kemasan}%`)
      .lte("gula", gula);

  const result = await api;

  return { props: { query, result, propsKeyword: q } };
}

export default function SearchPage({ result, propsKeyword }) {
  const [loading, setLoading] = useState(true);
  const [keyword, setKeyword] = useState();

  useEffect(() => {
    setKeyword(propsKeyword);
  }, [propsKeyword]);

  useEffect(() => {
    if (result && result.data.length > 0) setLoading(false);
  }, [result]);

  let render = <Spinner />;
  if (!loading && result.data?.length > 0)
    render = <DrinkListView list={result.data} />;
  else if (!loading && (result.data?.length < 1 || result.length < 1))
    render = (
      <ErrorLayout
        title="Yah, yang kamu cari gaada :("
        imagePath="/faces/sad-face.svg"
      >
        <div>
          Coba cari produk manis lain kayak kopi, susu, yogurt atau yang lain
          deh. Atau cobain cari berdasarkan kemasan minuman manis favorit
          gimana?
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
