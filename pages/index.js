import { createClient } from "@supabase/supabase-js";
import { supaKey, supaUrl } from "helpers/util";
import DrinkList from "layouts/Product/DrinkList";
import { Cover, DrinkCategory, SweetInfo } from "pageElement/home";
import PageHead from "pages/PageHead";

export async function getStaticProps() {
  const supabase = createClient(supaUrl(), supaKey());

  const res = await supabase
    .from("minuman")
    .select("*")
    .range(0, 9)
    .order("created_at", { ascending: false });

  if (res.error)
    return {
      redirect: {
        destination: "/502",
      },
    };

  return {
    props: { drinkList: res.data || null },
  };
}

export default function Home({ drinkList }) {
  return (
    <>
      <PageHead title="Cari Manis" />
      <div className="container">
        <Cover />
        <DrinkCategory />
        <SweetInfo />
        <DrinkList drinkList={drinkList} />
      </div>
    </>
  );
}
