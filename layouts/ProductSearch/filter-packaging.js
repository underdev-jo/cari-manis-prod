import useSWR from "swr";
import { capitalize, slugify } from "helpers/util";
import { useRouter } from "next/router";
import SelectDropdown from "components/Dropdown/pop-dropdown";

const fetcher = (url) =>
  fetch(url, { method: "GET" }).then((res) => res.json());

export default function FilterPackaging() {
  const { data, error } = useSWR("/api/get-packaging", fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
  });
  const packages = (data && data.data) || [];

  const { replace, push, query: queryParam, pathname: path } = useRouter();
  const filtering = queryParam?.kemasan || "";

  const select = ({ value = "" }) => {
    const kemasan = slugify(value || "");
    delete queryParam.filter;
    let newQuery = { ...queryParam, kemasan, page: 1 };
    const params = new URLSearchParams(newQuery).toString();
    const linker = path === "/cari" ? replace : push;
    linker(`/cari?${params}`);
  };

  const options = [
    { value: "", label: "Semua Kemasan" },
    ...packages.map((i) => ({
      value: `${i.name}`.toLowerCase(),
      label: i.name,
    })),
  ];

  const selIndex = options.findIndex((i) => i.value === filtering);

  return (
    <SelectDropdown
      id="filterKemasan"
      text={`Kemasan${filtering ? ` ${capitalize(filtering)}` : ""}`}
      onSelect={select}
      list={options}
      selected={selIndex}
      title="Jenis Kemasan"
    />
  );
}
