import Dropdown from "components/Dropdown";
import { get } from "helpers/api";
import { capitalize, slugify } from "helpers/util";
import { useRouter } from "next/router";

export async function getServerSideProps(context) {
  const { query } = context;
  const { packages = [] } = await get("kemasan_minuman");
  return { props: { query, packages } };
}

export default function FilterPackaging({ query, packages = [] }) {
  const { replace, query: queryParam } = useRouter();
  const filtering = query?.kemasan || "";

  const select = ({ value = "" }) => {
    const kemasan = value !== "Semua Jenis" ? slugify(value || "") : "";
    let newQuery = { ...queryParam, kemasan };
    const newParams = new URLSearchParams(newQuery).toString();
    replace(`/cari?${newParams}`);
  };

  return (
    <Dropdown
      size="xs"
      text={`Kemasan${filtering ? `: ${capitalize(filtering)}` : ""} ⯆`}
      onSelect={select}
      list={packages.map((item) => ({ key: item.id, value: item.name }))}
      selected={
        packages.length > 0
          ? packages.find((item) => filtering === item.name)
          : ""
      }
    />
  );
}
