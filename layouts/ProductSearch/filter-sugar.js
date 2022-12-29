import Dropdown from "components/Dropdown";
import drinkSugarLevel from "helpers/drinkSugarLevel";
import { slugify } from "helpers/util";
import { useRouter } from "next/router";

export default function FilterSugar({ query = { gula: "" } }) {
  const { replace } = useRouter();
  const filtering = query.gula || "";

  const replacePaarams = (value) => {
    const gula = slugify(value || "");
    let newQuery = { ...query, gula };
    const params = new URLSearchParams(newQuery).toString();
    replace(`/cari?${params}`);
  };

  const onSelectSugar = (e) => {
    replacePaarams(e.key);
  };

  let textDropdown = "Kadar Gula";
  if (filtering)
    textDropdown = `Kadar Gula: ${
      drinkSugarLevel.find((i) => i.key === filtering).value
    }`;

  return (
    <Dropdown
      list={drinkSugarLevel}
      selected={filtering}
      text={textDropdown}
      onSelect={onSelectSugar}
      size="xs"
    />
  );
}
