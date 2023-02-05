import { baseUrl } from "helpers/util";
import SearchPage from "pages/cari";
import { useEffect, useState } from "react";

export async function getServerSideProps({ query }) {
  const {
    gula = 999,
    kemasan = "",
    q = "",
    urutkan = "",
    jenis = "",
    page = 1,
  } = query;
  const params = new URLSearchParams({
    q,
    gula,
    kemasan,
    urutkan,
    jenis,
    page,
  }).toString();
  const apiUrl = `${baseUrl}/api/product-search?${params}`;
  const dataSearch = await (await fetch(apiUrl)).json();

  return {
    props: {
      dataSearch,
    },
  };
}

export default function TambahProduk({ dataSearch = {} }) {
  const [open, setOpen] = useState(false);

  console.log("Tambah: ", dataSearch);

  useEffect(() => {
    setOpen(true);

    return () => setOpen(false);
  }, []);

  let defClass = "transition-all duration-300";
  let stateClass = "mt-[300px] opacity-0 pointer-events-none";
  if (open) stateClass = "mt-[0px] opacity-100";

  const className = `${defClass} ${stateClass}`;

  return <SearchPage classes={className} {...dataSearch} />;
}
