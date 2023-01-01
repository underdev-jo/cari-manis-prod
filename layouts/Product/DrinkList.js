import DrinkCard from "components/Product/drink-card";
import Section from "components/Section";

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

const DrinkList = ({ drinkList = [] }) => (
  <Section title="Daftar produk minuman">
    <DrinkListView list={drinkList} />
  </Section>
);

export default DrinkList;
