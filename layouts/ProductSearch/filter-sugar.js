import SelectDropdown from "components/Dropdown/pop-dropdown";
import { selectorSugar as selector } from "helpers/drink-selector";
import { slugify } from "helpers/util";
import { useRouter } from "next/router";

export default function FilterSugar() {
  const { replace, push, query: queryParam, pathname: path } = useRouter();
  const filtering = queryParam?.gula || "";

  const replacePaarams = (value) => {
    const gula = slugify(value || "");
    delete queryParam.filter;
    let newQuery = { ...queryParam, gula, page: 1 };
    const params = new URLSearchParams(newQuery).toString();
    const linker = path === "/cari" ? replace : push;
    linker(`/cari?${params}`);
  };

  const onSelectSugar = (e) => {
    replacePaarams(e.key || e.value);
  };

  let textDropdown = "Kadar Gula";
  let target = 0;
  if (filtering) {
    target = selector.findIndex(
      (i) => parseInt(i.value) >= parseInt(filtering)
    );
    textDropdown = `Gula ≥ ${selector[target].value}gr`;
  }

  return (
    <SelectDropdown
      list={selector}
      selected={target}
      text={textDropdown}
      onSelect={onSelectSugar}
      id="filterSugar"
      title="Kandungan Gula Maksimal"
    />
  );
}
