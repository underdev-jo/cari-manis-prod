import Dropdown from "components/Dropdown";
import { slugify } from "helpers/util";
import { useRouter } from "next/router";

export default function FilterSugar({ query = { gula: "" } }) {
  const { replace } = useRouter();
  const filtering = query.gula || "";

  const sugarList = [
    { key: "", value: "Semua" },
    { key: `5`, value: "Max. 5gr" },
    { key: `10`, value: "Max. 10gr" },
    { key: `20`, value: "Max. 20gr" },
    { key: `30`, value: "Max. 30gr" },
    { key: `50`, value: "Max. 50gr" },
    { key: `999`, value: ">50gr" },
  ];

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
      sugarList.find((i) => i.key === filtering).value
    }`;

  return (
    <Dropdown
      list={sugarList}
      selected={filtering}
      text={textDropdown}
      onSelect={onSelectSugar}
      size="xs"
    />
  );
}
