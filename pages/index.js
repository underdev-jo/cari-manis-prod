import { createClient } from "@supabase/supabase-js";
import { supaKey, supaUrl } from "helpers/util";
import Home from "./home";

export async function getServerSideProps() {
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

export default function index({ drinkList }) {
  return <Home drinkList={drinkList} />;
}
