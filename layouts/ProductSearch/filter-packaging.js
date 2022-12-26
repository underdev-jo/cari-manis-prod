import { Dropdown } from "components";
import { get } from "helpers/api";
import { capitalize, slugify } from "helpers/util";
import { useRouter } from "next/router";

import { useEffect, useState } from "react";

export default function FilterPackaging({ query = { kemasan: "" } }) {
  const [packages, setPackages] = useState([]);

  const { replace } = useRouter();
  const filtering = query?.kemasan || "";

  useEffect(() => {
    const hit = async () => {
      const { data = [] } = await get("kemasan_minuman");
      setPackages([{ id: "", name: "Semua Jenis" }, ...data] || res);
    };

    if (packages.length < 1) hit();
  }, [packages]);

  const select = ({ value = "" }) => {
    const kemasan = value !== "Semua Jenis" ? slugify(value || "") : "";
    let newQuery = { ...query, kemasan };
    const newParams = new URLSearchParams(newQuery).toString();
    replace(`/cari?${newParams}`);
  };

  // console.log(packages.find((item) => filtering === item.name));

  return (
    <Dropdown
      size="xs"
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
