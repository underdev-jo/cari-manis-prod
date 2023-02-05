import SearchPage from "pages/cari";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export async function getServerSideProps({ query }) {
  const {
    gula = 999,
    kemasan = "",
    q = "",
    urutkan = "",
    jenis = "",
    page = 1,
  } = query;
  let baseurl = "http://localhost:3000/api/product-search";
  const params = new URLSearchParams({
    q,
    gula,
    kemasan,
    urutkan,
    jenis,
    page,
  }).toString();
  const dataSearch = await (await fetch(`${baseurl}?${params}`)).json();

  return {
    props: {
      dataSearch,
    },
  };
}

export default function TambahProduk({ dataSearch }) {
  const [open, setOpen] = useState(false);

  console.log("Tambah: ", dataSearch);

  useEffect(() => {
    setOpen(true);

    return () => setOpen(false);
  }, []);

  let defClass = "transition-all duration-500";
  let stateClass = "translate-y-[30%] opacity-0 pointer-events-none";
  if (open) stateClass = "translate-y-0 opacity-100";

  const className = `${defClass} ${stateClass}`;

  return <SearchPage classes={className} {...dataSearch} />;
}
