import SelectDropdown from "components/Dropdown/dropdown";
import { selectorType as selector } from "helpers/drink-selector";
import { slugify } from "helpers/util";
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

  const onSelectSugar = (e) => {
    replacePaarams(e.key);
  };

  let textDropdown = "Semua Jenis";
  if (filtering) {
    const target = selector.find((i) => i.key === filtering).value;
    textDropdown = `Jenis: ${target}`;
  }

  return (
    <SelectDropdown
      list={selector}
      text={textDropdown}
      onSelect={onSelectSugar}
      id="filterType"
    />
  );
}
