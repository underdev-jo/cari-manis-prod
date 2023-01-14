import { createClient } from "@supabase/supabase-js";
import { eq, getCount } from "helpers/api";
import { supaKey, supaUrl } from "helpers/util";
import { ProductView } from "pageElement/product";
import AddToCalculator from "pageElement/product/AddToCalculator";
import PageHead from "pages/PageHead";

export async function getServerSideProps({ params, req }) {
  const supabase = createClient(supaUrl(), supaKey());

  const { data, error } = await eq("minuman", {
    column: "id",
    value: params.id,
  });

  // const commentParam = { column: "product_id", value: params.id };
  // const count = await getCount("product_comment", commentParam);
  // const { data: dataComm, error: errComm } = await supabase
  //   .from("product_comment")
  //   .select("*")
  //   .eq("product_id", params.id)
  //   .order("created_at", { ascending: false });

  // const comment = { data: dataComm, error: errComm, count };
  const props = { product: data[0] };

  if (error)
    return {
      redirect: {
        destination: "/404",
      },
    };

  return { props };
}

export default function ProductDetail({ product, comment }) {
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
