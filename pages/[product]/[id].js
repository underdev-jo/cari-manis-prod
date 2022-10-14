import { createClient } from "@supabase/supabase-js";
import PageHead from "../PageHead";
import { supaKey, supaUrl } from "../../helpers/util";
import Image from "next/image";
import Header from "../../components/Header/Header";

export async function getStaticProps() {
  const supabase = createClient(supaUrl(), supaKey());

  const { data, error } = await supabase
    .from("minuman")
    .select("*")
    .eq("id", 1);

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

export async function getStaticPaths() {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: "blocking", //indicates the type of fallback
  };
}

export default function ProductDetail({ product }) {
  return (
    <>
      <PageHead title={product.name || "Produk Detail - cari manis"} />
      <Header back />
      <div>
        <h2>HEHHEE</h2>
        <div>{`Product detail: ${JSON.stringify(product)}`}</div>
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
