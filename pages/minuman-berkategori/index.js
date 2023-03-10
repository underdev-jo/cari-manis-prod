import DrinkList from "layouts/Product/DrinkList";
import { useState } from "react";

const selectList = [
  {
    name: "Gula Terendah",
    key: "lowSugar",
    desc: "Rendah gula adalah produk minuman yang memiliki kandungan gula kurang dari 5gr per 100gr berat minuman",
    searchFilter: "/cari?urutkan=lowsugar",
    slugFilter: "/cari/rendah-gula",
  },
  {
    name: "Rendah Kalori",
    key: "lowCal",
    searchFilter: "/cari?urutkan=lowcal",
    slugFilter: "/cari/rendah-kalori",
  },
  {
    name: "Susu",
    key: "milk",
    searchFilter: "/cari?jenis=susu",
    slugFilter: "/cari/susu",
  },
  {
    name: "Kopi",
    key: "coffee",
    searchFilter: "/cari?jenis=kopi",
    slugFilter: "/cari/kopi",
  },
  {
    name: "Jus",
    key: "juice",
    searchFilter: "/cari?jenis=jus",
    slugFilter: "/cari/jus",
  },
  {
    name: "Paling Manis",
    key: "mostSweet",
    searchFilter: "/cari?urutkan=highsugar",
    slugFilter: "/cari/tinggi-gula",
  },
];

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

export default function MinumanBerkategori({ filtered }) {
  const [active, setActive] = useState(selectList[0].key);

  let unitDisplay = "sugar";
  if (active === "lowCal" || active === "highCal") unitDisplay = "calorie";

  if (!filtered) return "";

  return (
    <DrinkList
      sectionTitle="Daftar Produk Minuman"
      drinkList={filtered[active]}
      underTitle={<Selector active={active} setActive={setActive} />}
      sticky
      unitDisplay={unitDisplay}
      filter={`${selectList.find((i) => i.key === active).slugFilter}/1`}
      useMoreBtn
    />
  );
}
