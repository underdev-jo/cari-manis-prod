import { apiSelection, apiSort } from "helpers/supabase";
import { baseUrl } from "helpers/util";
import DrinkList from "layouts/Product/DrinkList";
import { Cover, DrinkCategory, SweetInfo } from "pageElement/home";
import PageHead from "pages/PageHead";
import { useState } from "react";
import { requestMilk } from "./api/home-content";

const selectList = [
  {
    name: "Gula Terendah",
    key: "lowSugar",
    desc: "Rendah gula adalah produk minuman yang memiliki kandungan gula kurang dari 5gr per 100gr berat minuman",
    searchFilter: "/cari?urutkan=lowsugar",
  },
  {
    name: "Rendah Kalori",
    key: "lowCal",
    searchFilter: "/cari?urutkan=lowcal",
  },
  { name: "Susu", key: "milk", searchFilter: "/cari?jenis=susu" },
  { name: "Kopi", key: "coffee", searchFilter: "/cari?jenis=kopi" },
  { name: "Jus", key: "juice", searchFilter: "/cari?jenis=jus" },
  {
    name: "Paling Manis",
    key: "mostSweet",
    searchFilter: "/cari?urutkan=highsugar",
  },
];

export async function getStaticProps() {
  let fetching = await fetch(`${baseUrl}/api/home-content`);
  console.log("FETCHED: ", fetching);
  const filtered = fetching ? await fetching.json() : null;

  // const filtered = {
  //   lowSugar: await apiSort("gula"),
  //   lowCal: await apiSort("kalori"),
  //   milk: await requestMilk(),
  //   coffee: await apiSelection("kopi", "coffee"),
  //   juice: await apiSelection("jus", "juice"),
  //   mostSweet: await apiSort("gula", true),
  // };

  return {
    props: { filtered },
    revalidate: 3600,
  };
}

const Selector = ({ active, setActive }) => {
  return (
    <div
      className="overflow-x-auto overflow-y-hidden w-full selector-drink-home-wrapper -mx-4 px-4 sm:mx-0 sm:px-0 sm:!w-full sm:!max-w-full"
      style={{
        width: "calc(100% + 30px)",
      }}
    >
      <div className="selector-drink-home">
        {selectList.map((item) => (
          <button
            key={item.key}
            onClick={() => setActive(item.key)}
            className={`badge badge-primary badge-outline p-3 ${
              active === item.key ? "bg-black !text-white" : ""
            } hover:border-black hover:text-black`}
          >
            {item.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default function Home({ drinkList, filtered }) {
  const [active, setActive] = useState(selectList[0].key);
  let unitDisplay = "sugar";
  if (active === "lowCal" || active === "highCal") unitDisplay = "calorie";

  return (
    <>
      <PageHead title="Cari Manis" />
      <div className="container">
        <Cover />
        <DrinkCategory />
        <SweetInfo />
        <DrinkList
          sectionTitle="Daftar Produk Minuman"
          drinkList={filtered[active]}
          underTitle={<Selector active={active} setActive={setActive} />}
          sticky
          unitDisplay={unitDisplay}
          filter={selectList.find((i) => i.key === active).searchFilter}
          useMoreBtn
        />
      </div>
    </>
  );
}
