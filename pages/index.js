import { createClient } from "@supabase/supabase-js";
import { supaKey, supaUrl } from "helpers/util";
import Home from "./home";

export async function getStaticProps() {
  const supabase = createClient(supaUrl(), supaKey());

  const res = await supabase.from("minuman").select("*");

  if (res.error)
    return {
      redirect: {
        destination: "/502",
      },
      // props: { drinkList: [] },
    };

  return {
    props: { drinkList: res.data || null },
  };
}

export default function index({ drinkList }) {
  return <Home drinkList={drinkList} />;
}
