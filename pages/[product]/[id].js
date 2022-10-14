import { createClient } from "@supabase/supabase-js";
import PageHead from "../PageHead";
import { supaKey, supaUrl } from "../../helpers/util";
import Container from "../../components/Layout/Container";
import ProductView, {
  ProductImage,
  ProductInformation,
  ProductNutrition,
  ProductSummary,
} from "./ProductView";

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
      <ProductView product={product} />
    </>
  );
}
