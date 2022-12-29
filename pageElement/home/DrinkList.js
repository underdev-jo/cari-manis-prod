import { DrinkCard, Section } from "components";

export const ThumbnailWrapper = ({ children }) => {
  return (
    <div className="flex flex-wrap justify-between [&>*]:w-[calc(50%-20px)]">
      {children}
    </div>
  );
};

export const DrinkListView = ({ list }) => (
  <ThumbnailWrapper>
    {list.map((item, index) => (
      <DrinkCard key={item.id || index} {...item} />
    ))}
  </ThumbnailWrapper>
);

export default function DrinkList({ drinkList = [] }) {
  return (
    <Section title="Daftar produk minuman">
      <DrinkListView list={drinkList} />
    </Section>
  );
}
