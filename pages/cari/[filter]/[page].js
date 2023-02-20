import { baseUrl, capitalize } from "helpers/util";
import CariFiltered from "../[filter]";

export function getStaticPaths() {
  const pathKemasan = [
    { params: { filter: "kemasan-botol", page: `1` } },
    { params: { filter: "kemasan-karton", page: `1` } },
    { params: { filter: "kemasan-kaleng", page: `1` } },
    { params: { filter: "kemasan-sachet", page: `1` } },
  ];
  const pathType = [
    { params: { filter: "rendah-gula", page: `1` } },
    { params: { filter: "rendah-kalori", page: `1` } },
    { params: { filter: "susu", page: `1` } },
    { params: { filter: "kopi", page: `1` } },
    { params: { filter: "jus", page: `1` } },
    { params: { filter: "tinggi-gula", page: `1` } },
  ];
  const pathList = [...pathKemasan, ...pathType];
  return {
    paths: pathList,
    fallback: true,
  };
}

export async function getStaticProps(context) {
  const { filter, page } = context.params;

  let params = "";
  if (`${filter}`.includes("kemasan")) {
    const filterSplit = `${filter}`.split("-");
    const kemasan = capitalize(filterSplit[1]);
    params = { kemasan };
  } else if (filter === "rendah-gula") params = { urutkan: "lowsugar" };
  else if (filter === "rendah-kalori") params = { urutkan: "lowcal" };
  else if (filter === "tinggi-gula") params = { urutkan: "highsugar" };
  else if (filter === "susu" || filter === "kopi" || filter === "jus")
    params = { jenis: filter };

  const urlParams = new URLSearchParams({ ...params, page }).toString();
  const apiUrl = `${baseUrl}/api/product-search?${urlParams}`;
  const fetchAPI = await (await fetch(apiUrl)).json();

  return { props: { filter, ...fetchAPI }, revalidate: 3600 };
}

export default function CariFilter({ filter, ...props }) {
  return <CariFiltered filter={filter} {...props} />;
}
