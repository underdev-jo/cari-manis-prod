import Image from "next/image";
import { useRouter } from "next/router";
import { slugify } from "helpers/util";
import Section from "components/Section";
import Dropdown from "components/Dropdown";
import { useState } from "react";
import { selectorPackaging, selectorSugar } from "helpers/drink-selector";
import Button from "components/Button";
import { IconSearch } from "public/icons";

function ButtonProductCategory({
  name,
  value,
  image,
  slug,
  keySlug,
  query = "kemasan",
}) {
  const { push } = useRouter();
  const classBtnFilter = `btn btn-ghost my-2 py-3 px-2 h-auto flex justify-start items-center normal-case w-[48%] max-w-[186px] border-[#E2E8F5]`;
  const onClick = () => push(`/cari?${query}=${slugify(keySlug || slug)}`);

  return (
    <button type="button" className={classBtnFilter} onClick={onClick}>
      {image && (
        <div className="mr-3">
          <Image
            src={image}
            alt={value || name}
            title={value || name}
            width={32}
            height={32}
          />
        </div>
      )}
      <div className="text-small medium">{value || name}</div>
    </button>
  );
}

const ProductPackageSelector = () => {
  const list = selectorPackaging;
  return list.map((item) => (
    <ButtonProductCategory
      key={item.name}
      keySlug={item.key}
      query="kemasan"
      {...item}
    />
  ));
};

const ProductSugar = () => {
  const [sugar, setSugar] = useState(1);
  const router = useRouter();

  const searchSugar = () => {
    router.push(`/cari?gula=${sugar}`);
  };

  const onChange = (e) => {
    const val = e.target.value;
    if (val >= 1 && val) setSugar(val);
  };

  const max = 50;
  const btnlist = [1, 13, 25, 37, 50];

  let bgBar = "bg-carman-blue-9";
  let colorText = "text-carman-blue-9";
  if (sugar > 25) {
    bgBar = "bg-red-700";
    colorText = "text-red-600";
  }

  return (
    <div className="relative block w-full my-4 px-2">
      <div className="relative h-5 -mx-[8px]">
        <div
          className="absolute w-full left-0 right-0 top-[50%] h-2 bg-slate-200 rounded-lg"
          style={{ transform: "translate(0, -50%)" }}
        />
        <div
          className={`absolute left-0 right-0 top-[50%] ${bgBar} rounded-full`}
          style={{
            transform: "translate(0%, -50%)",
            minWidth: `2rem`,
            width: `calc(${sugar * 2}% + ${sugar > 14 ? "1rem" : "1.5rem"})`,
            maxWidth: "calc(100% + 0.5rem)",
            height: `calc(100% + 0.5rem)`,
          }}
        />
        <input
          className="relative sugar-slider"
          type="range"
          max={max}
          value={sugar}
          onChange={onChange}
        />
      </div>
      <div className="flex justify-between items-center mt-2">
        {btnlist.map((item, index) => (
          <button
            key={item}
            onClick={() => setSugar(item)}
            className="w-4 h-4 cursor-pointer text-carman-blue-9 text-xs font-medium"
          >
            |
          </button>
        ))}
      </div>
      <div className="flex justify-between mt-4">
        <div>
          <div className={`text-heading2 font-bold ${colorText}`}>
            {sugar}gr
          </div>
          <div className="text-carman-gray-4 text-small">Maksimal gula</div>
        </div>
        <div>
          <Button model="blue" onClick={searchSugar}>
            <div className="flex items-center">
              <IconSearch />
              <div>Cari Produk</div>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default function DrinkCategory() {
  const [selected, setSelected] = useState("kemasan");

  const list = [
    { value: "Jenis Kemasan", key: "kemasan", children: selectorPackaging },
    {
      value: "Kandungan Gula",
      key: "gula",
      children: selectorSugar.filter((i) => i.key !== ""),
    },
  ];

  return (
    <Section
      title={
        <div className="flex items-center">
          <div>Cari berdasarkan</div>
          <Dropdown
            color="secondary"
            selected={selected.value || selected}
            onSelect={({ key }) => setSelected(key)}
            list={list}
          >
            {list.find((i) => i.key === selected).value}
          </Dropdown>
        </div>
      }
    >
      <div className="flex flex-wrap justify-between">
        {selected === "gula" ? <ProductSugar /> : <ProductPackageSelector />}
      </div>
    </Section>
  );
}
