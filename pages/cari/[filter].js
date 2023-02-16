import { baseUrl, capitalize } from "helpers/util";
import SearchPage from ".";

export function getStaticPaths() {
  const pathKemasan = [
    { params: { filter: "kemasan-botol" } },
    { params: { filter: "kemasan-karton" } },
    { params: { filter: "kemasan-kaleng" } },
    { params: { filter: "kemasan-sachet" } },
  ];
  const pathType = [
    { params: { filter: "rendah-gula" } },
    { params: { filter: "rendah-kalori" } },
    { params: { filter: "susu" } },
    { params: { filter: "kopi" } },
    { params: { filter: "jus" } },
    { params: { filter: "tinggi-gula" } },
  ];
  const pathList = [...pathKemasan, ...pathType];
  return {
    paths: pathList,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const { filter } = context.params;

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

  const urlParams = new URLSearchParams(params).toString();
  const apiUrl = `${baseUrl}/api/product-search?${urlParams}`;
  const fetchAPI = await (await fetch(apiUrl)).json();
  console.log({ apiUrl, urlParams, fetchAPI });

  return { props: { filter, ...fetchAPI } };
}

export default function CariFilter({ filter, ...props }) {
  const filterWord = `${filter}`.split("-").join(" ");
  let title = "Cari Manis";
  if (filter && filterWord) title = `Cari: ${capitalize(filterWord)}`;
  return <SearchPage {...props} />;
}
