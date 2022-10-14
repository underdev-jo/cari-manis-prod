import Section from "../../components/Sections/Section";

import DrinkCard from "./DrinkCard";

export default function DrinkList({ drinkList = [] }) {
  return (
    <Section title="Daftar produk minuman">
      <div className="flex flex-wrap justify-between [&>*]:w-[calc(50%-20px)]">
        {drinkList.map((drink) => (
          <DrinkCard key={drink.id} {...drink} />
        ))}
        <DrinkCard />
        <DrinkCard />
        <DrinkCard />
      </div>
    </Section>
  );
}
