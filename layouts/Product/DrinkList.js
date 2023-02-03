import DrinkCard from "components/Product/drink-card";
import Section from "components/Section";
import { useRouter } from "next/router";

export const ThumbnailWrapper = ({ children }) => {
  return (
    <div className="flex flex-wrap justify-between [&>*]:w-[calc(50%-20px)] -mx-2.5">
      {children}
    </div>
  );
};

export const DrinkListView = ({ list = [], unitDisplay }) =>
  list && list.length > 0 ? (
    <ThumbnailWrapper>
      {list.map((item, index) => (
        <DrinkCard key={item.id || index} {...item} unitDisplay={unitDisplay} />
      ))}
    </ThumbnailWrapper>
  ) : (
    <div>Produk tidak tersedia</div>
  );

const MoreButton = ({ filter = "" }) => {
  const { push } = useRouter();

  const click = () => push(filter || "/cari");

  return (
    <div className="flex justify-center my-4">
      <button
        className="btn btn-ghost normal-case text-carman-blue-0 text-medium font-medium"
        onClick={click}
      >
        Lihat Produk Lainnya
      </button>
    </div>
  );
};

const DrinkList = ({
  drinkList = [],
  topEl = "",
  sectionTitle = "",
  sticky,
  underTitle,
  unitDisplay = "sugar",
  filter = "",
  useMoreBtn,
}) => (
  <Section title={sectionTitle} sticky={sticky} underTitle={underTitle}>
    {topEl}
    <DrinkListView list={drinkList} unitDisplay={unitDisplay} />
    {useMoreBtn && <MoreButton filter={filter} />}
  </Section>
);

export default DrinkList;
