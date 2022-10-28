import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Button from "../../components/Button/Button";
import Dropdown from "../../components/Dropdown/Dropdown";
import { get } from "../../helpers/api";
import { capitalize, slugify } from "../../helpers/util";

export default function FilterPackaging() {
  const [packages, setPackages] = useState([]);

  const { query, replace } = useRouter();
  const filtering = query.kemasan || "";

  useEffect(() => {
    const hit = async () => {
      const res = await get("kemasan_minuman");
      setPackages([{ id: "", name: "Semua Jenis" }, ...res.data] || res);
    };

    if (packages.length < 1) hit();
  }, [packages]);

  const select = ({ value = "" }) => {
    const kemasan = value !== "Semua Jenis" ? slugify(value || "") : "";
    let newQuery = { ...query, kemasan };
    const params = new URLSearchParams(newQuery).toString();
    replace(`/search?${params}`);
  };

  // console.log(packages.find((item) => filtering === item.name));

  return (
    <Dropdown
      text={`Kemasan${filtering ? `: ${capitalize(filtering)}` : ""}`}
      onSelect={select}
      list={packages.map((item) => ({ key: item.id, value: item.name }))}
      selected={
        packages.length > 0
          ? packages.find((item) => filtering === item.name)
          : ""
      }
    />
  );
}
