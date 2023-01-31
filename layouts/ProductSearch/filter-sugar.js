import SelectDropdown from "components/Dropdown/dropdown";
import { selectorSugar as selector } from "helpers/drink-selector";
import { slugify } from "helpers/util";
import { useRouter } from "next/router";

export default function FilterSugar() {
  const { replace, query: queryParam } = useRouter();
  const filtering = queryParam?.gula || "";

  const replacePaarams = (value) => {
    const gula = slugify(value || "");
    let newQuery = { ...queryParam, gula };
    const params = new URLSearchParams(newQuery).toString();
    replace(`/cari?${params}`);
  };

  const onSelectSugar = (e) => {
    replacePaarams(e.key || e.value);
  };

  let textDropdown = "Kadar Gula";
  let target = 0;
  if (filtering) {
    textDropdown = `Kadar Gula: ${selector[target].value}`;
    target = selector.findIndex(
      (i) => parseInt(i.value) >= parseInt(filtering)
    );
  }

  return (
    <SelectDropdown
      list={selector}
      selected={selector[target]}
      text={textDropdown}
      onSelect={onSelectSugar}
      id="filterSugar"
    />
  );
}
