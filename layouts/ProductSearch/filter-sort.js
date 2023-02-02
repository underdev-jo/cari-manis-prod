import SelectDropdown from "components/Dropdown/dropdown";
import { selectorSort as selector } from "helpers/drink-selector";
import { slugify } from "helpers/util";
import { useRouter } from "next/router";

export default function FilterSort() {
  const { replace, query: queryParam } = useRouter();
  const filtering = queryParam?.urutkan || "";

  const replacePaarams = (value) => {
    const urutkan = slugify(value || "");
    let newQuery = { ...queryParam, urutkan };
    const params = new URLSearchParams(newQuery).toString();
    replace(`/cari?${params}`);
  };

  const onSelectSugar = (e) => {
    replacePaarams(e.key || e.value);
  };

  const target = selector.findIndex((i) => i.value === filtering);
  let textDropdown = selector[target].label;

  return (
    <SelectDropdown
      list={selector}
      text={textDropdown}
      onSelect={onSelectSugar}
      id="filterSort"
      selected={selector[target]}
      title="Urutkan Data"
    />
  );
}
