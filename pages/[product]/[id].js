import { createClient } from "@supabase/supabase-js";
import PageHead from "../PageHead";
import { supaKey, supaUrl } from "../../helpers/util";
import ProductView from "./ProductView";
import { useState } from "react";
import ProductInfo from "./ProductInfoPopup";
import ProductComment from "./ProductComment";
import { eq, getCount } from "../../helpers/api";

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

  const { data, error } = await eq("minuman", {
    column: "id",
    value: params.id,
  });

  const commentParam = { column: "product_id", value: params.id };
  const count = await getCount("product_comment", commentParam);
  const { data: dataComm, error: errComm } = await eq(
    "product_comment",
    commentParam
  );

  const comment = { data: dataComm, error: errComm, count };
  const props = { product: data[0], comment };

  console.log("GET STATIC PROPS: ", { data, error, count, dataComm, errComm });

  if (error)
    return {
      redirect: {
        destination: "/404",
      },
    };

  return { props };
}

export default function ProductDetail({ product, comment }) {
  const [popup, setPopup] = useState(false);

  if (!product) return "Loading...";

  const close = () => setPopup(false);

  return (
    <>
      <PageHead title={product.name || "Produk Detail - cari manis"} />
      <ProductView product={product} setPopup={setPopup} />
      <ProductInfo
        isOpen={popup && typeof popup === "object"}
        data={popup}
        onClose={close}
      />
      <ProductComment comment={comment} />
    </>
  );
}
