import { createClient } from "@supabase/supabase-js";
import { supaKey, supaUrl, tableMinuman } from "helpers/util";
import DrinkList from "layouts/Product/DrinkList";
import { Cover, DrinkCategory, SweetInfo } from "pageElement/home";
import PageHead from "pages/PageHead";
import { useState } from "react";

const selectList = [
  {
    name: "Gula Terendah",
    key: "lowSugar",
    desc: "Rendah gula adalah produk minuman yang memiliki kandungan gula kurang dari 5gr per 100gr berat minuman",
  },
  { name: "Rendah Kalori", key: "lowCal" },
  { name: "Susu", key: "milk" },
  { name: "Kopi", key: "coffee" },
  { name: "Jus", key: "juice" },
  { name: "Paling Manis", key: "mostSweet" },
  { name: "Kalori Tertinggi", key: "mostCal" },
];

export async function getStaticProps() {
  const supa = createClient(supaUrl(), supaKey());
  const table = tableMinuman;

  const res = await supa
    .from(table)
    .select()
    .order("created_at", { ascending: false })
    .range(0, 9);

  const lowSugar = await supa.from(table).select().order("gula").range(0, 9);

  const lowCal = await supa.from(table).select().order("kalori").range(0, 9);

  const milk = await supa
    .from(table)
    .select()
    .or(
      "name.ilike.%susu%,name.ilike.%milk%,kategori.ilike.%susu%,kategori.ilike.%milk%,category.cs.{susu},category.cs.{milk}"
    )
    .filter("name", "not.ilike", "%kopi%")
    .filter("name", "not.ilike", "%teh%")
    .filter("name", "not.ilike", "%tea%")
    .order("created_at", { ascending: false })
    .range(0, 9);

  const coffee = await supa
    .from(table)
    .select()
    .or(
      "name.ilike.%kopi%,name.ilike.%coffee%,kategori.ilike.%kopi%,kategori.ilike.%coffee%,category.cs.{kopi},category.cs.{coffee}"
    )
    .order("created_at", { ascending: false })
    .range(0, 9);

  const juice = await supa
    .from(table)
    .select()
    .or(
      "name.ilike.%jus%,name.ilike.%juice%,kategori.ilike.%juice%,kategori.ilike.%jus%,category.cs.{jus},category.cs.{juice}"
    )
    .order("created_at", { ascending: false })
    .range(0, 9);

  const mostSweet = await supa
    .from(table)
    .select()
    .order("gula", { ascending: false })
    .range(0, 9);

  const mostCal = await supa
    .from(table)
    .select()
    .order("kalori", { ascending: false })
    .range(0, 9);

  if (res.error)
    return {
      redirect: {
        destination: "/502",
      },
    };

  const filtered = {
    lowSugar,
    lowCal,
    milk,
    coffee,
    juice,
    mostSweet,
    mostCal,
  };

  return {
    props: { drinkList: res || null, filtered },
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

  return (
    <>
      <PageHead title="Cari Manis" />
      <div className="container">
        <Cover />
        <DrinkCategory />
        <SweetInfo />
        <DrinkList
          sectionTitle="Daftar Produk Minuman"
          drinkList={filtered[active] ? filtered[active].data : drinkList.data}
          underTitle={<Selector active={active} setActive={setActive} />}
          sticky
        />
      </div>
    </>
  );
}
