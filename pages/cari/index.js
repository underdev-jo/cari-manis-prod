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

export async function getServerSideProps(context) {
  const { query } = context;
  return { props: { query } };
}

export default function SearchPage({ query }) {
  const [loading, setLoading] = useState(true);
  const [result, setRes] = useState(false);
  const [keyword, setKeyword] = useState();

  useEffect(() => {
    const search = async (name = "", kemasan = "", gula = 0) => {
      console.log("Search: ", { name, kemasan, gula });
      setLoading(true);

      let api = get("minuman");

      const clientAPI = createClient(supaUrl(), supaKey());
      if (name || kemasan || gula)
        api = clientAPI
          .from("minuman")
          .select("*")
          .ilike("name", `%${name}%`)
          .ilike("packaging", `%${kemasan}%`)
          .lte("gula", gula);

      const res = await api;

      setTimeout(() => {
        setRes(res);
        setLoading(false);
      }, 1000);
    };

    const keys = Object.keys(query).length > 0;
    const { gula = 0, kemasan = "", q = "" } = query;
    setKeyword(query.q || "");
    if (keys) search(q || "", kemasan || "", gula || 999);
    else search("");
  }, [query]);

  let render = <Spinner />;
  if (!loading && result.data?.length > 0)
    render = <DrinkListView list={result.data} />;
  else if (!loading && (result.data?.length < 1 || result.length < 1))
    render = (
      <ErrorLayout
        title="Yah, yang kamu cari gaada :("
        imagePath="/faces/sad-face.svg"
      />
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
