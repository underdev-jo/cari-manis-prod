import Section from "../../components/Sections/Section";
import DrinkCard from "./DrinkCard";

export default function DrinkList() {
  return (
    <Section title="Daftar produk minuman">
      <div className="flex flex-wrap justify-between [&>*]:w-[calc(50%-20px)]">
        <DrinkCard />
        <DrinkCard />
        <DrinkCard />
      </div>
    </Section>
  );
}
