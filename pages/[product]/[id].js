import { supabase } from "helpers/supabase";
import { baseUrl, tableMinuman } from "helpers/util";
import AddToCalculator from "pageElement/product/AddToCalculator";
import ProductView from "pageElement/product/ProductView";
import PageHead from "pages/PageHead";

export async function getStaticPaths() {
  const res = await supabase.from(tableMinuman).select("name,id");
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
  const { data, error } = await (
    await fetch(`${baseUrl}/api/product-detail?id=${params.id}`)
  ).json();

  const props = { product: data[0] };

  if (error)
    return {
      redirect: {
        destination: "/404",
      },
    };

  return { props, revalidate: 3600 };
}

export default function ProductDetail({ product }) {
  if (!product) return "Loading...";

  return (
    <>
      <PageHead title={product.name || "Produk Detail - cari manis"} />
      <ProductView product={product} />
      <AddToCalculator product={product} />
    </>
  );
}
