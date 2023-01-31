import useSWR from "swr";
import { capitalize, slugify } from "helpers/util";
import { useRouter } from "next/router";
import SelectDropdown from "components/Dropdown/dropdown";

const fetcher = (url) =>
  fetch(url, { method: "GET" }).then((res) => res.json());

export default function FilterPackaging() {
  const { data, error } = useSWR("api/get-packaging", fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
  });
  const packages = (data && data.data) || [];
  const dataPackages = [
    {
      id: "01",
      name: "Semua Kemasan",
      created_at: new Date().toISOString(),
    },
    ...packages,
  ];

  const { replace, query: queryParam } = useRouter();
  const filtering = queryParam?.kemasan || "";

  const select = ({ value = "" }) => {
    const kemasan = value !== "Semua Kemasan" ? slugify(value || "") : "";
    let newQuery = { ...queryParam, kemasan };
    const newParams = new URLSearchParams(newQuery).toString();
    replace(`/cari?${newParams}`);
  };

  const options = dataPackages.map((i) => ({
    value: `${i.name}`.toLowerCase(),
    label: i.name,
  }));

  const selIndex = options.findIndex((i) => i.value === filtering);

  return (
    <SelectDropdown
      id="filterKemasan"
      text={`Kemasan${filtering ? `: ${capitalize(filtering)}` : ""}`}
      onSelect={select}
      list={options}
      selected={options[selIndex]}
    />
  );
}
