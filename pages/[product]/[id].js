import { createClient } from "@supabase/supabase-js";
import PageHead from "../PageHead";
import { supaKey, supaUrl } from "../../helpers/util";
import Image from "next/image";
import Header from "../../components/Header/Header";

export async function getStaticPaths() {
  const supabase = createClient(supaUrl(), supaKey());
  const res = await supabase.from("minuman").select("name,id");
  let paths = [];

  paths = res.data.map((x) => ({
    params: { product: x.name.toString(), id: x.id.toString() },
  }));

  return {
    paths, //indicates that no page needs be created at build time
    fallback: "blocking", //indicates the type of fallback
  };
}

export async function getStaticProps({ params }) {
  const supabase = createClient(supaUrl(), supaKey());

  const { data, error } = await supabase
    .from("minuman")
    .select("*")
    .eq("id", params.id);

  if (error)
    return {
      redirect: {
        destination: "/404",
      },
    };

  return {
    props: { product: data[0] },
  };
}

export default function ProductDetail({ product }) {
  if (!product) return "Loading...";
  return (
    <>
      <PageHead title={product.name || "Produk Detail - cari manis"} />
      <Header back />
      <div>
        <div>
          <Image
            width={100}
            height={100}
            src={product.image}
            alt={product.name}
            title={product.name}
          />
        </div>
      </div>
    </>
  );
}
