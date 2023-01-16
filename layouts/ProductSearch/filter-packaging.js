import Dropdown from "components/Dropdown";
import useSWR from "swr";
import { get } from "helpers/api";
import { capitalize, slugify } from "helpers/util";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { supabase } from "helpers/supabase";

const fetcher = (url) =>
  fetch(url, { method: "GET" }).then((res) => res.json());

export default function FilterPackaging() {
  const { data, error } = useSWR("api/get-packaging", fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
  });
  const packages = (data && data.data) || [];
  const dataPackages = [
    {
      id: "01",
      name: "Semua Kemasan",
      created_at: new Date().toISOString(),
    },
    ...packages,
  ];

  const { replace, query: queryParam } = useRouter();
  const filtering = queryParam?.kemasan || "";

  const select = ({ value = "" }) => {
    const kemasan = value !== "Semua Kemasan" ? slugify(value || "") : "";
    let newQuery = { ...queryParam, kemasan };
    const newParams = new URLSearchParams(newQuery).toString();
    replace(`/cari?${newParams}`);
  };

  return (
    <Dropdown
      size="xs"
      text={`Kemasan${filtering ? `: ${capitalize(filtering)}` : ""}`}
      onSelect={select}
      list={dataPackages.map((item) => ({ key: item.id, value: item.name }))}
      selected={
        dataPackages.length > 0
          ? dataPackages.find((item) => filtering === item.name)
          : ""
      }
    />
  );
}
