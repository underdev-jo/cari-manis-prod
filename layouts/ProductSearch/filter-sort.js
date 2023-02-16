import SelectDropdown from "components/Dropdown/pop-dropdown";
import { selectorSort as selector } from "helpers/drink-selector";
import { slugify } from "helpers/util";
import { useRouter } from "next/router";

export default function FilterSort() {
  const { replace, push, query: queryParam, pathname: path } = useRouter();
  const filtering = queryParam?.urutkan || "";

  const replacePaarams = (value) => {
    const urutkan = slugify(value || "");
    delete queryParam.filter;
    let newQuery = { ...queryParam, urutkan, page: 1 };
    const params = new URLSearchParams(newQuery).toString();
    const linker = path === "/cari" ? replace : push;
    linker(`/cari?${params}`);
  };

  const onSelectSugar = (e) => {
    replacePaarams(e.key || e.value);
  };

  let textDropdown = "Urutkan";
  let target = 0;
  if (filtering) {
    target = selector.findIndex((i) => i.value === filtering);
    textDropdown = selector[target]?.label || "Urutkan";
  }

  return (
    <SelectDropdown
      list={selector}
      text={textDropdown}
      onSelect={onSelectSugar}
      id="filterSort"
      selected={target}
      title="Urutkan Data"
    />
  );
}
