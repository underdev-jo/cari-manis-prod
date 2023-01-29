import DrinkCard from "components/Product/drink-card";
import Section from "components/Section";

export const ThumbnailWrapper = ({ children }) => {
  return (
    <div className="flex flex-wrap justify-between [&>*]:w-[calc(50%-20px)] -mx-2.5">
      {children}
    </div>
  );
};

export const DrinkListView = ({ list = [] }) =>
  list && list.length > 0 ? (
    <ThumbnailWrapper>
      {list.map((item, index) => (
        <DrinkCard key={item.id || index} {...item} />
      ))}
    </ThumbnailWrapper>
  ) : (
    <div>Produk tidak tersedia</div>
  );

const DrinkList = ({
  drinkList = [],
  topEl = "",
  sectionTitle = "",
  sticky,
  underTitle,
}) => (
  <Section title={sectionTitle} sticky={sticky} underTitle={underTitle}>
    {topEl}
    <DrinkListView list={drinkList} />
  </Section>
);

export default DrinkList;
