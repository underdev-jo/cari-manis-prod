import { useRouter } from "next/router";
import { useState } from "react";
import Dropdown from "../../components/Dropdown/Dropdown";
import { slugify } from "../../helpers/util";

export default function FilterSugar({ query }) {
  const [selected, setSelected] = useState({ key: "" });

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
    replace(`/search?${params}`);
  };

  const onSelectSugar = (e) => {
    console.log("Select sugar: ", e);
    setSelected(e);
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
    />
  );
}
