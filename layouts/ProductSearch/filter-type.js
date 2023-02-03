import SelectDropdown from "components/Dropdown/pop-dropdown";
import { selectorType as selector } from "helpers/drink-selector";
import { capitalize, slugify } from "helpers/util";
import { useRouter } from "next/router";

export default function FilterType() {
  const { replace, query: queryParam } = useRouter();
  const filtering = queryParam?.jenis || "";

  const replacePaarams = (value) => {
    const jenis = slugify(value || "");
    let newQuery = { ...queryParam, jenis, page: 1 };
    const params = new URLSearchParams(newQuery).toString();
    replace(`/cari?${params}`);
  };

  const onSelectSugar = (e) => replacePaarams(e.value);

  let textDropdown = "Jenis";
  const target = selector.findIndex((i) => i.value === filtering);

  if (filtering) textDropdown = capitalize(`${selector[target].value}`);

  return (
    <SelectDropdown
      list={selector}
      text={textDropdown}
      onSelect={onSelectSugar}
      selected={target}
      id="filterType"
      title="Jenis Minuman"
    />
  );
}
