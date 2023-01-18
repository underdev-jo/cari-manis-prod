import { createClient } from "@supabase/supabase-js";
import { supaKey, supaUrl } from "helpers/util";
import DrinkList from "layouts/Product/DrinkList";
import { Cover, DrinkCategory, SweetInfo } from "pageElement/home";
import PageHead from "pages/PageHead";
import { useState } from "react";

export async function getStaticProps() {
  const supabase = createClient(supaUrl(), supaKey());

  const res = await supabase
    .from("minuman")
    .select("*")
    .range(0, 9)
    .order("created_at", { ascending: false });

  if (res.error)
    return {
      redirect: {
        destination: "/502",
      },
    };

  return {
    props: { drinkList: res.data || null },
  };
}

const selectList = [
  { name: "Rendah Gula", key: "low-sugar" },
  { name: "Rendah Kalori", key: "low-cal" },
  { name: "Super Manis", key: "ext-sweet" },
  { name: "Tinggi Kalori", key: "ext-cal" },
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

export default function Home({ drinkList }) {
  const [active, setActive] = useState("low-sugar");
  return (
    <>
      <PageHead title="Cari Manis" />
      <div className="container">
        <Cover />
        <DrinkCategory />
        <SweetInfo />
        <DrinkList
          drinkList={drinkList}
          topEl={<Selector active={active} setActive={setActive} />}
        />
      </div>
    </>
  );
}
