import { createClient } from "@supabase/supabase-js";
import { supaKey, supaUrl } from "../helpers/util";
import Home from "./home";

export async function getStaticProps() {
  const supabase = createClient(supaUrl(), supaKey());

  const res = await supabase.from("minuman").select("*");

  if (res.error)
    return {
      redirect: {
        destination: "/404",
      },
    };

  return {
    props: { drinkList: res.data },
  };
}

export default function index({ drinkList }) {
  return <Home drinkList={drinkList} />;
}
