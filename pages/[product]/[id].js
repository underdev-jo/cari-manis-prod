import { createClient } from "@supabase/supabase-js";
import { eq } from "helpers/api";
import { supaKey, supaUrl } from "helpers/util";
import { ProductView } from "pageElement/product";
import AddToCalculator from "pageElement/product/AddToCalculator";
import PageHead from "pages/PageHead";

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
  const { data, error } = await eq("minuman", {
    column: "id",
    value: params.id,
  });

  const props = { product: data[0] };

  if (error)
    return {
      redirect: {
        destination: "/404",
      },
    };

  return { props };
}

export default function ProductDetail({ product }) {
  if (!product) return "Loading...";

  return (
    <>
      <PageHead title={product.name || "Produk Detail - cari manis"} />
      <ProductView product={product} />
      <AddToCalculator product={product} />
      {/* <ProductComment comment={comment} /> */}
    </>
  );
}
