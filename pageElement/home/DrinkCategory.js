import Image from "next/image";
import { useRouter } from "next/router";
import { slugify } from "helpers/util";
import Section from "components/Section";
import Dropdown from "components/Dropdown";
import { useState } from "react";
import { selectorPackaging, selectorSugar } from "helpers/drink-selector";

function ButtonProductCategory({ name, value, image, slug, keySlug }) {
  const { push } = useRouter();
  const classBtnFilter = `btn btn-ghost my-2 py-3 px-2 h-auto flex justify-start items-center normal-case w-[48%] max-w-[186px] border-[#E2E8F5]`;
  const onClick = () => push(`/cari?kemasan=${slugify(keySlug || slug)}`);

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
            {list.find((i) => i.key === selected).value} ⯆
          </Dropdown>
        </div>
      }
    >
      <div className="flex flex-wrap justify-between">
        {list
          .find((i) => i.key === selected)
          .children.map((item) => (
            <ButtonProductCategory
              key={item.name}
              keySlug={item.key}
              {...item}
            />
          ))}
      </div>
    </Section>
  );
}
