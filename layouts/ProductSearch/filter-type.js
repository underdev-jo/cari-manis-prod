import SelectDropdown from "components/Dropdown/dropdown";
import { selectorType as selector } from "helpers/drink-selector";
import { capitalize, slugify } from "helpers/util";
import { useRouter } from "next/router";

export default function FilterType() {
  const { replace, query: queryParam } = useRouter();
  const filtering = queryParam?.jenis || "";

  const replacePaarams = (value) => {
    const jenis = slugify(value || "");
    let newQuery = { ...queryParam, jenis };
    const params = new URLSearchParams(newQuery).toString();
    replace(`/cari?${params}`);
  };

  const onSelectSugar = (e) => replacePaarams(e.value);

  let textDropdown = "Semua Jenis";
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
